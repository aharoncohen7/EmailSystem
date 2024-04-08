
const userController = require('../DL/controllers/user.controller.js');
const { Flags } = require('../utility')

let funcs = {
    inbox: [Flags.Inbox],
    notread: [Flags.NotRead],
    send: [Flags.Sent],
    favorite: [Flags.Favorite],
    deleted: [Flags.Deleted],
    draft: [Flags.Draft],
}

async function getNumbers(userId) {
    console.log(userId);
    let { chats } = await userController.readOne({_id: userId});
  
    const nums = {
    inbox: chats.filter(c => c.isRead == false && c.isDeleted == false  && c.isRecieved == true).length,
    send: chats.filter(c => c.isRead == false && c.isDeleted == false && c.isSent == true).length,
    favorite: chats.filter(c => c.isRead == false && c.isDeleted == false && c.isFavorite == true).length,
    deleted: chats.filter(c => c.isRead == false && c.isDeleted == false && c.isRecieved == true).length,
    }
    return nums
}




async function getChats(userId, flag) {
    console.log(flag);
    if (!funcs[flag]) throw { msg: 'no filter found' }
    let { chats } = await userController.readByFlags(userId, funcs[flag], { chats: true, users: true });
    return chats
}
async function getChatsByFlags(userId, flags) {
    console.log(flags);
    const arrayFlags = flags.flatMap(flag => funcs[flag])
    console.log(arrayFlags);
    let { chats } = await userController.readByFlags(userId, arrayFlags, { chats: true, users: true });
    return chats
}

async function updateReadChat(userId, chatId) {
    let user = await userController.readOne(userId);
    user.chats.find(c => c._id == chatId).isRead = true
    userController.save(user)
    // let chatIndex = chats.findIndex(c => c._id == chatId)
    // userController.update({ _id: userId }, { $set: { [`chats.${chatIndex}.isRead`]: true } })
}

module.exports = {getNumbers, getChats, getChatsByFlags, updateReadChat }