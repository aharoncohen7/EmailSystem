
const emailController = require('../DL/controllers/email.controller')
const messageServices = require('../BL/message.services')
const userServices = require('../BL/user.services')


async function getAll() {
  return await read({})
}

async function getAllRecieved() {
  return await emailController.read({}, true)
}

async function getAllEmailMsg(emailId) {
  return await emailController.read({_id: emailId}, true)
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
  let updatedEmail = await emailController.readOne({ _id: emailId })
  //הוספת הודעה לשיחה
  updatedEmail.msg.push(msgDB._id)
  //עדכון זמן אחרון
  updatedEmail.msg.lastDate = Date.now()
  updatedEmail.save()
   //קבלת משתמש שולח
   let userFrom = await userServices.getById({_id:msg.from})
   //קבלת אייטם שמכיל את האמייל אצל היוזר
   let userFrom_Email = userFrom.emails.find(item => item.email == emailId)
   //עדכון שליחה
   userFrom_Email.isSent = true;
   //עדכון קריאה
   userFrom_Email.isRead = true;
   //שמירה
   userFrom.save()
  //  קבלת נמען
   let userTo_Email = userTo.emails.find(item => item.email == emailId)
   //עדכון קבלה
   userTo_Email.isRecieved = true;
  // עדכון אי קריאה
  userTo_Email.isRead  = false;
  //  שמירה
   userTo.save()

  return await emailController.readOne({ _id: emailId }, true)
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
  let emailDB = await emailController.create({subject, msg: msgId})
  let emailId = emailDB._id;
  //קבלת משתמש שולח
  let userFrom = await userServices.getById({_id:msg.from})
  // console.log(userFrom);
  // הוספת שיחה לשולח
  userFrom.emails.push({email: emailId})
  //עדכון שליחה
  userFrom.emails[userFrom.emails.length-1].isSent = true;
  //עדכון קריאה
  userFrom.emails[userFrom.emails.length-1].isRead = true;
  userFrom.save()
  //הכנסת שיחה למקבל
  userTo.emails.push({email: emailId})
  //עדכון קבלה
  userTo.emails[userTo.emails.length-1].isRecieved = true;
  //עדכון אי קריאה כששלח לעצמו
  // userFrom.emails[userFrom.emails.length-1].isRead = false;
  userTo.save()
  return userTo
}






module.exports = { getAll, getAllEmailMsg, getAllRecieved, addMessageToEmail, sendNewEmail }