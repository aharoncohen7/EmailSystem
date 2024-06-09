
const userController = require('../DL/controllers/user.controller.js');
const chatController = require('../DL/controllers/chat.controller')
const userServices = require('../BL/user.services')

//שליחת מייל חדש
async function sendNewChat(req) {
  console.log("sendNewChat");
  // הוספת שולח לחברי צ'אט
  let membersId = [req.body.from];
  // המרה לכתובת למזהה
  for (const member of req.body.members) {
    const user = await userController.readOne({ email: member });
    membersId = [...membersId, user.id];
  }
  //יצירת צ'אט חדש ושיבוץ ההודעה החדשה
  let newChat = await chatController.create({
    subject: req.body.subject,
    msg: [{
      from: req.user._id,
      content: req.body.content,
      image: req.body.image || ""
    }],
    members: membersId
  })
  // מערך משתתפים
  let members = await userServices.getAllUsers({ _id: { $in: membersId } });
  // מזהה הצא'ט של השולח כיד לנתב את העמוד לשם
  let userChatId;
  //הכנסת שיחה לחברי צאט
  members.map((member, index) => {
    member.chats.push({ chat: newChat._id })
    // טיפול בשדות עבור השולח
    if (member.id === req.body.from) {
      member.chats[member.chats.length - 1].isSent = true;
      member.chats[member.chats.length - 1].isReceived = false;
      member.chats[member.chats.length - 1].isRead = true;
      userChatId = member.chats[member.chats.length - 1].id;
    }
    // עבור שאר החברים
    else {
      member.chats[member.chats.length - 1].isReceived = true;
      member.chats[member.chats.length - 1].isRead = false;
    }
    member.save()
  })
  return userChatId;
}

// שליחת הודעה לשיחה קיימת
async function addMessageToChat(body) {
  // console.log(body);
  //הבאת צאט שורש
  const chat = await userServices.getUserChatById({ _id: body.from }, body.chatId);
  // console.log("🚀 ~ addMessageToChat ~ chatToUpdate:", chat)
  const chatToUpdate = await chatController.readOne({ _id: chat.chat._id })
  //הוספת הודעה לצ'אט
  chatToUpdate.msg.push(body)
  //עדכון זמן אחרון
  chatToUpdate.lastDate = Date.now()
  chatToUpdate.save()
  // console.log("🚀 ~ addMessageToChat ~ chatToUpdate:", chatToUpdate)
  // קבלת כל חברי צ'אט
  let members = await userServices.getAllUsers({ _id: { $in: chatToUpdate.members } }, { chats: true, users: true })
  // עדכון קבלה אצל שאר החברים
  members.map((member) => {
    const member_chat = member.chats.find(item => item.chat == chatToUpdate.id)
    // עבור השולח
    if (member._id == body.from) {
      // console.log(member._id, "sender");
      member_chat.isSent = true;
      member_chat.isRead = true;
    }
    // עבור השאר
    else {
      // console.log(member._id, "member");
      member_chat.isReceived = true;
      member_chat.isRead = false;
    }
    member.save()
  })
  return true;
}

// מיותר
// במקרה והURL הוא מזהה כללי של צאט ולא מזהה של יוזר
async function getChatById(chatId, userId) {
  // console.log(chatId, userId);
  const chatToShow = await chatController.readOne({ _id: chatId }, true);
  // console.log("🚀 ~ getChatById ~ chatToShow:", chatToShow)
  // נוודא שאכן הצאט הזה קיים אצל המשתמש   
  if(chatToShow.members.includes(userId)){
      return chatToShow;
   }
   else{
     return null;
   }
}

async function getAll() {
  return await chatController.read({})
}

async function getAllReceived() {
  return await chatController.read({}, true)
}


module.exports = {
  addMessageToChat, sendNewChat,
}


// // חיפוש בתוכן צ'אט
// function filterArrayByString(arr, searchString) {
//   // יצירת מערך חדש שיכיל את כל האיברים שמכילים את המחרוזת המחפשת
//   const filteredArray = arr.filter(item => {
//     // בדיקה אם הסובייקט של השיחה מכיל את המחרוזת
//     if (item.chat.subject && item.chat.subject.toLowerCase().includes(searchString)) {
//       return true;
//     }
//     // בדיקה אם קיימת הודעה בשיחה שהתוכן שלה מכיל את המחרוזת
//     if (item.chat.msg.some(msg => msg.content && msg.content.toLowerCase().includes(searchString))) {
//       return true;
//     }
//     // בדיקה אם קיימים חברים בשיחה שהשם של אחד מהם מכיל את המחרוזת
//     if (item.chat.members.some(member => member.fullName && member.fullName.toLowerCase().includes(searchString))) {
//       return true;
//     }
//     // אם המחרוזת לא נמצאה באף אחד מהשדות, נחזיר false
//     return false;
//   });

//   return filteredArray;
// }
