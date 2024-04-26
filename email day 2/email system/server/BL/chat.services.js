
const userController = require('../DL/controllers/user.controller.js');
const chatController = require('../DL/controllers/chat.controller')
const messageServices = require('../BL/message.services')
const userServices = require('../BL/user.services')

const { Flags } = require('../utility')

let funcs = {
  inbox: [Flags.Inbox],
  notread: [Flags.NotRead],
  send: [Flags.Sent],
  favorite: [Flags.Favorite],
  deleted: [Flags.Deleted],
  draft: [Flags.Draft],
}

// קבלת מספר שלא נקראו 
async function getNotRead(userId) {
  console.log(userId);
  let { chats } = await userController.readOne({ _id: userId });
  // console.log(chats);
  const nums = {
    inbox: chats.filter(c => c.isRead == false && c.isDeleted == false && c.isReceived == true).length,
    send: chats.filter(c => c.isRead == false && c.isDeleted == false && c.isSent == true).length,
    favorite: chats.filter(c => c.isRead == false && c.isDeleted == false && c.isFavorite == true).length,
    deleted: chats.filter(c => c.isRead == false && c.isDeleted == false && c.isReceived == true).length,
  }
  // console.log(nums);
  return nums
}

// קבלת צאטים לפי קטגוריה
async function getChats(userId, flag) {
  console.log(userId, flag);
  if (!funcs[flag]) throw { msg: 'no filter found' }
  let { chats } = await userController.readByFlags(userId, funcs[flag], { chats: true, users: true });
  return chats
}

// קבלת צאטים לפי מספר קטגוריות
async function getChatsByFlags(userId, flags) {
  
  flags= [...flags, "deleted"]
  console.log(flags);
  const arrayFlags = flags.flatMap(flag => funcs[flag])
  
  console.log("🚀 ~ getChatsByFlags ~ arrayFlags:", arrayFlags)
  let { chats } = await userController.readByFlags(userId, arrayFlags, { chats: true, users: true });
  return chats
}


// קבלת רשימת צ'אטים לפי עמוד וסינון לפי חיפוש
async function getChatList(userId, flags, input) {
  
  flags= [...flags, "deleted"]
  console.log(flags, input);
  const arrayFlags = flags.flatMap(flag => funcs[flag])
  console.log(arrayFlags);
  let { chats } = await userController.readByFlags(userId, arrayFlags, { chats: true, users: true });
  //   if(input) {
  //   const chatList = chats.filter(item => item.chat.subject.toLowerCase().includes(input.toLowerCase()))
  //   return chatList
  // }

  if (input) {
    const chatList = filterArrayByString(chats, input.toLowerCase())
    return chatList
  }

  return chats
}








// עדכון למצב קראתי אצל יוזר מסויים
async function updateReadChat(userId, chatId) {
  let user = await userController.readOne(userId);
  user.chats.find(c => c._id == chatId).isRead = true;
  userController.save(user)
  // let chatIndex = chats.findIndex(c => c._id == chatId)
  // userController.update({ _id: userId }, { $set: { [`chats.${chatIndex}.isRead`]: true } })
}

// עדכון למצב לא קראתי אצל יוזר מסויים
async function updateNotReadChat(userId, chatId) {
  let user = await userController.readOne(userId);
  user.chats.find(c => c._id == chatId).isRead = false;
  userController.save(user)
  // let chatIndex = chats.findIndex(c => c._id == chatId)
  // userController.update({ _id: userId }, { $set: { [`chats.${chatIndex}.isRead`]: true } })
}


//שליחת מייל חדש
async function sendNewChat(req) {
  console.log("sendNewChat");
  // הוספת שולח לחברי צ'אט
  let membersId = [];
  // המרה לכתובת למזהה
  for (const member of req.body.members) {
    const user = await userController.readOne({ email: member });
    membersId = [ ...membersId, user.id];
  }
  membersId = [req.body.from, ...membersId];
  // console.log(members, "members");
  //יצירת צ'אט חדש ושיבוץ ההודעה החדשה
  let newChat = await chatController.create({
    subject: req.body.subject,
    msg: [{
      from: req.user._id,
      content: req.body.content
    }],
    members: membersId
  })

  // let chatId = chatDB._id;
  //קבלת משתמש שולח
  // let userFrom = await userServices.getById({ _id: req.body.from })
  // // console.log(userFrom);
  // // // הוספת שיחה לשולח
  // // userFrom.chats.push({ chat: chatId })
  // //עדכון שליחה
  // userFrom.chats[userFrom.chats.length - 1].isSent = true;
  // userFrom.chats[userFrom.chats.length - 1].isReceived = false;
  // userFrom.chats[userFrom.chats.length - 1].isRead = true;
  // userFrom.save()
  // מערך משתתפים
  let members = await userServices.getAll({ _id: { $in: membersId } })
  let userChatId;
  //הכנסת שיחה למקבל
  //עדכון קבלה
  members.map((member, index) => {
    member.chats.push({ chat: newChat._id })
    if (index === 0) {
      member.chats[member.chats.length - 1].isSent = true;
      member.chats[member.chats.length - 1].isReceived = false;
      member.chats[member.chats.length - 1].isRead = true;
      userChatId = member.chats[member.chats.length - 1].id;
    }
    else {
      member.chats[member.chats.length - 1].isReceived = true;
      member.chats[member.chats.length - 1].isRead = false;
    }
    member.save()
  })

  // userTo.chats.push({ email: emailId })

  // userTo.chats[userTo.chats.length - 1].isReceived = true;

  // userTo.save()
  return userChatId;
}


// שליחת הודעה לשיחה קיימת
async function addMessageToChat(body) {
  //הבאת צאט שורש
  let chatToUpdate = await chatController.readOne({ _id: body.chatId })
  //הוספת הודעה לצ'אט
  chatToUpdate.msg.push({ from: body.from, content: body.content })
  //עדכון זמן אחרון
  chatToUpdate.lastDate = Date.now()
  chatToUpdate.save()
  // קבלת כל חברי צ'אט
  let members = await userServices.getAll({ _id: { $in: chatToUpdate.members } }, { chats: true, users: true })
  // עדכון קבלה אצל שאר החברים
  members.map((member) => {
    const member_chat = member.chats.find(item => item.chat == body.chatId)
    if (member._id == body.from) {
      // console.log(member._id, "sender");
      member_chat.isSent = true;
      member_chat.isRead = true;
    }
    else {
      // console.log(member._id, "member");
      member_chat.isReceived = true;
      member_chat.isRead = false;
    }
    member.save()
  })
  return await chatController.readOne({ _id: body.chatId }, true)
}


// קבלת צ'אט מסויים עבור הצד הימני באתר
// async function getChatById(chatId, userId) {
//   console.log(chatId, userId);
//   let { chats } = await userController.readByFlags(userId, ["inbox"], { chats: true, users: true });
//   console.log("🚀 ~ getChatById ~ chats:", chats)

//   const chatToShow = chats.find(c => c.chat == chatId)
//   console.log("🚀 ~ getChatById ~ chatToShow:", chatToShow)
// //   if(chatToShow.members.includes(userId)){
// //     return chatToShow;
// //  }
// //  else{
// //    return null
// //  }
// return chatToShow
// }


// // קבלת צ'אט מסויים עבור הצד הימני באתר
async function getChatById(chatId, userId) {
  console.log(chatId, userId);
  const chatToShow = await chatController.readOne({ _id: chatId }, true);
  console.log("🚀 ~ getChatById ~ chatToShow:", chatToShow)
  // console.log(chatToShow);
  //   if(chatToShow.members.includes(userId)){
  //     return chatToShow;
  //  }
  //  else{
  //    return null;
  //  }
  return chatToShow
}

async function getAll() {
  return await chatController.read({})
}

async function getAllReceived() {
  return await chatController.read({}, true)
}
// כפול
// async function getAllChatMsg(emailId) {
//   return await chatController.read({ _id: emailId }, true)
// }


module.exports = {
  getNotRead, getChats, getChatsByFlags, getChatList, getChatById, updateReadChat, updateNotReadChat, addMessageToChat, sendNewChat,
  // getAll, getAllChatMsg, getAllReceived,
}


// חיפוש בתוכן צ'אט
function filterArrayByString(arr, searchString) {
  // יצירת מערך חדש שיכיל את כל האיברים שמכילים את המחרוזת המחפשת
  const filteredArray = arr.filter(item => {
    // בדיקה אם הסובייקט של השיחה מכיל את המחרוזת
    if (item.chat.subject && item.chat.subject.toLowerCase().includes(searchString)) {
      return true;
    }
    // בדיקה אם קיימת הודעה בשיחה שהתוכן שלה מכיל את המחרוזת
    if (item.chat.msg.some(msg => msg.content && msg.content.toLowerCase().includes(searchString))) {
      return true;
    }
    // בדיקה אם קיימים חברים בשיחה שהשם של אחד מהם מכיל את המחרוזת
    if (item.chat.members.some(member => member.fullName && member.fullName.toLowerCase().includes(searchString))) {
      return true;
    }
    // אם המחרוזת לא נמצאה באף אחד מהשדות, נחזיר false
    return false;
  });

  return filteredArray;
}
