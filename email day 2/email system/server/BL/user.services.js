const userControler =
  require('../DL/controllers/user.controller')


async function getAll(filter) {
  let users = await userControler.read(filter)
  users
}

async function getById(filter) {
  let user = await userControler.readOne(filter)
  return user
}

async function create(data) {
  let newUser = await userControler.create(data)
  return newUser

}
async function deleteById(id) {
  let deletedUser = await userControler.del(id)
  return deletedUser
}


async function updateEmail(filter, emailId, field) {
  let user = await userControler.readOne(filter)
  const foundEmail = user.emails.find(email => email._id == emailId);
  if(field=="isSent"||field=="isRecieved"){
    foundEmail[field] = true;
  }
  else{
    foundEmail[field] = !foundEmail[field]
  }
  await user.save()
  return user
}


async function getEmailsByFilter(filter, field) {
  let { emails } = await userControler.readOne(filter, true)
  const filteredEmails = emails.filter(obj => obj[field]);
  return filteredEmails
}

// async function getAllEmailMsg(userId,  emailId) {
//   let { messages } = await userControler.readOne({_id: userId}, true)
//   return messages
// }

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateEmail,
  getEmailsByFilter,
  // getAllEmailMsg
}