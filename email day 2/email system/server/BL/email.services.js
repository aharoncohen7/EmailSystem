
const chatController = require('../DL/controllers/chat.controller')
const messageServices = require('../BL/message.services')
const userServices = require('../BL/user.services')


async function getAll() {
  return await read({})
}

async function getAllRecieved() {
  return await chatController.read({}, true)
}

async function getAllEmailMsg(emailId) {
  return await chatController.read({_id: emailId}, true)
}

// שליחת הודעה לשיחה קיימת
async function addMessageToEmail(msg, emailId) {
  //קבלת נמען באמצעות כתובת מייל
  let userTo = await userServices.getById({email :msg.to}, true)
  //החלפת נמען בבקשה מכתובת למזהה
  msg.to = userTo._id;
  //יצירת הודעה
  let msgDB = await messageServices.createMessage(msg)
  //הבאת אמייל שורש
  let updatedEmail = await chatController.readOne({ _id: emailId })
  //הוספת הודעה לשיחה
  updatedEmail.msg.push(msgDB._id)
  //עדכון זמן אחרון
  updatedEmail.msg.lastDate = Date.now()
  updatedEmail.save()
   //קבלת משתמש שולח
   let userFrom = await userServices.getById({_id:msg.from})
   //קבלת אייטם שמכיל את האמייל אצל היוזר
   let userFrom_Email = userFrom.chats.find(item => item.email == emailId)
   //עדכון שליחה
   userFrom_Email.isSent = true;
   //עדכון קריאה
   userFrom_Email.isRead = true;
   //שמירה
   userFrom.save()
  //  קבלת נמען
   let userTo_Email = userTo.chats.find(item => item.email == emailId)
   //עדכון קבלה
   userTo_Email.isRecieved = true;
  // עדכון אי קריאה
  userTo_Email.isRead  = false;
  //  שמירה
   userTo.save()
  return await chatController.readOne({ _id: emailId }, true)
}


//שליחת מייל חדש
async function sendNewEmail(msg, subject) {
  console.log("sending email");
  //קבלת נמען באמצעות כתובת מייל
  let userTo = await userServices.getById({email :msg.to})
  //החלפת נמען בבקשה מכתובת למזהה
  msg.to = userTo._id;
  //יצירת הודעה
  let msgDB = await messageServices.createMessage(msg)
  //קבלת מזהה הודעה חדשה
  const msgId= msgDB._id;
  //יצירת אמייל חדש ושיבוץ ההודעה החדשה
  let emailDB = await chatController.create({subject, msg: msgId})
  let emailId = emailDB._id;
  //קבלת משתמש שולח
  let userFrom = await userServices.getById({_id:msg.from})
  // console.log(userFrom);
  // הוספת שיחה לשולח
  userFrom.chats.push({email: emailId})
  //עדכון שליחה
  userFrom.chats[userFrom.chats.length-1].isSent = true;
  //עדכון קריאה
  userFrom.chats[userFrom.chats.length-1].isRead = true;
  userFrom.save()
  //הכנסת שיחה למקבל
  userTo.chats.push({email: emailId})
  //עדכון קבלה
  userTo.chats[userTo.chats.length-1].isRecieved = true;
  //עדכון אי קריאה כששלח לעצמו
  // userFrom.chats[userFrom.chats.length-1].isRead = false;
  userTo.save()
  return userTo
}






module.exports = { getAll, getAllEmailMsg, getAllRecieved, addMessageToEmail, sendNewEmail }