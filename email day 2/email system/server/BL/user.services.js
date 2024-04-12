const userControler =
  require('../DL/controllers/user.controller')


async function getAll(filter) {
  let users = await userControler.read(filter)
  return users
}

async function getById(filter) {
  console.log("in getById");
  let user = await userControler.readOne(filter)
  // console.log(user);
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


async function updateChat(filter, chatId, field) {
  console.log(filter, chatId, field);
  let user = await userControler.readOne(filter)
  const foundChat = user.chats.find(chat => chat._id == chatId);
  if(!foundChat){
    return null;
  }
  if(field=="isSent"||field=="isRecieved"){
    foundChat[field] = true;
  }
  else{
    console.log(foundChat);
    foundChat[field] = !foundChat[field]
    console.log("ghfgh------------------------ghfgh");
    
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
  updateChat,
  getEmailsByFilter,
  // getAllEmailMsg
}