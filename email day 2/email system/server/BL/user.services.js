const userController =
  require('../DL/controllers/user.controller')


async function getAll(filter) {
  let users = await userController.read(filter)
  return users
}

async function getById(filter) {
  console.log("in getById");
  let user = await userController.readOne(filter)
  // console.log(user);
  return user
}

async function getMembersByEmail(searchString) {
  console.log("in getMembersByEmail");
  let users = await userController.read({ email: { $regex: searchString, $options: 'i' } })
  console.log(users);
  return users
}



async function create(data) {
  let newUser = await userController.create(data)
  return newUser

}
async function deleteById(id) {
  let deletedUser = await userController.del(id)
  return deletedUser
}


async function updateChat(filter, chatId, field) {
  console.log(filter, chatId, field);
  let user = await userController.readOne(filter)
  const foundChat = user.chats.find(chat => chat._id == chatId);
  if(!foundChat){
    return null;
  }
  if(field=="isSent"||field=="isReceived"){
    foundChat[field] = true;
  }
  else{
    console.log(foundChat);
    foundChat[field] = !foundChat[field]    
  }
  await user.save()
  return user
}



async function getEmailsByFilter(filter, field) {
  let { emails } = await userController.readOne(filter, true)
  const filteredEmails = emails.filter(obj => obj[field]);
  return filteredEmails
}

// async function getAllEmailMsg(userId,  emailId) {
//   let { messages } = await userController.readOne({_id: userId}, true)
//   return messages
// }

module.exports = {
  getAll,
  getById,
  getMembersByEmail,
  create,
  deleteById,
  updateChat,
  getEmailsByFilter,
  // getAllEmailMsg
}