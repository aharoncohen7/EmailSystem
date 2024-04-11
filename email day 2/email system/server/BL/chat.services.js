
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
    inbox: chats.filter(c => c.isRead == false && c.isDeleted == false && c.isRecieved == true).length,
    send: chats.filter(c => c.isRead == false && c.isDeleted == false && c.isSent == true).length,
    favorite: chats.filter(c => c.isRead == false && c.isDeleted == false && c.isFavorite == true).length,
    deleted: chats.filter(c => c.isRead == false && c.isDeleted == false && c.isRecieved == true).length,
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
  console.log(flags);
  const arrayFlags = flags.flatMap(flag => funcs[flag])
  console.log(arrayFlags);
  let { chats } = await userController.readByFlags(userId, arrayFlags, { chats: true, users: true });
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
  //יצירת צ'אט חדש ושיבוץ ההודעה החדשה
  let chatDB = await chatController.create({
    subject: req.body.subject,
    msg: [{
      from: req.user._id,
      content: req.body.content
    }],
    members: req.body.members,
  })
  let chatId = chatDB._id;
  //קבלת משתמש שולח
  let userFrom = await userServices.getById({ _id: req.user._id })
  // console.log(userFrom);
  // הוספת שיחה לשולח
  userFrom.chats.push({ chat: chatId })
  //עדכון שליחה
  userFrom.chats[userFrom.chats.length - 1].isSent = true;
  //עדכון קריאה
  userFrom.chats[userFrom.chats.length - 1].isRead = true;
  userFrom.save()
  // מערך משתתפים
  let usersTo = await userServices.getAll({ _id: { $in: req.body.members } })
  //הכנסת שיחה למקבל
  //עדכון קבלה
  usersTo.map((user) => {
    user.chats.push({ chat: chatId })
    user.chats[user.chats.length - 1].isRecieved = true;
    user.chats[user.chats.length - 1].isRead = false;
    user.save()
  })
  // userTo.chats.push({ email: emailId })

  // userTo.chats[userTo.chats.length - 1].isRecieved = true;

  // userTo.save()
  return chatId
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
      member_chat.isRecieved = true;
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
  const chatToShow = await chatController.readOne({_id: chatId}, true);
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

async function getAllRecieved() {
  return await chatController.read({}, true)
}
// כפול
// async function getAllChatMsg(emailId) {
//   return await chatController.read({ _id: emailId }, true)
// }


module.exports = {
  getNotRead, getChats, getChatsByFlags, getChatById, updateReadChat, updateNotReadChat, addMessageToChat, sendNewChat,
  // getAll, getAllChatMsg, getAllRecieved,
}