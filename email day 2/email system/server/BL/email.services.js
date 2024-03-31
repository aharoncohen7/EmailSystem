
const emailController = require('../DL/controllers/email.controller')
const messageController = require('../DL/controllers/message.controller')
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

async function addMessageToEmail(emailId, msg) {
  let msgDB = await messageController.create(msg)
  let email = await emailController.readOne({ _id: emailId })
  email.msg.push(msgDB._id)
  return await email.save()
}

async function sendEmail(from, to, subject, content) {
  const msg = { to, from, content }
  const lastDate = new Date();
  console.log(msg);
  let msgDB = await messageController.create(msg)
  const msgId= msgDB._id
  let email = await emailController.create({subject, msgId, lastDate})
  let allEmailMsg = await getAllEmailMsg(email._id)
  console.log(allEmailMsg);
  return allEmailMsg
}






module.exports = { getAll, getAllEmailMsg, getAllRecieved, addMessageToEmail, sendEmail }