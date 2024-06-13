const userController = require('../DL/controllers/user.controller')
const { Flags } = require('../utility')

  let funcs = {
    inbox: [Flags.Inbox],
    notread: [Flags.NotRead],
    send: [Flags.Sent],
    favorites: [Flags.Favorites],
    deleted: [Flags.Deleted],
    drafts: [Flags.Drafts],
  }

// יצירת יוזר
async function createUser(data) {
  console.log("in create user");
  let newUser = await userController.create(data)
  return newUser
}
//עדכון יוזר
async function updateUserById(id, data) {
  console.log("in update user");
  let newUser = await userController.update(id, data)
  return newUser
}

// עדכון התראות 
async function updateNotifications(filter, notification) {
  console.log(filter, notification);
  let user = await userController.readOne(filter)
  user.notifications.push(notification)
  await user.save()
  return user.notifications
}




// מחיקת יוזר
async function deleteUserById(id) {
  let deletedUser = await userController.del(id)
  return deletedUser
}

//קבלת כל היוזרים 
async function getAllUsers(filter) {
  let users = await userController.read(filter)
  return users
}



async function getUser(filter) {
  console.log("in get user");
  let user = await userController.readOne(filter)
  console.log(user);
  return user
}



//  יוזר לפי מזהה
async function getUserById(filter) {
  console.log("in get user By Id");
  let user = await userController.readOne(filter)
  // console.log(user);
  return user
}
// קבלת משתמש עם סיסמה עבור לוגין
async function getUserWithPassword(filter) {
  // console.log("getUserWithPassword", filter);
  let user = await userController.readOne(filter, {}, true);
  // console.log(user);
  return user
}


//  קבלת חברי שיחה
async function getMembersByEmail(searchString) {
  console.log("in getMembersByEmail");
  let users = await userController.read({ email: { $regex: searchString, $options: 'i' } })
  console.log(users);
  return users
}


// שייך לצאטים של משתמש-------------------------------------

// קבלת יוזר-צאט - לפי מזהה יוזר-צאט אישיuuuuuuuuuuuuuuuuu
async function getUserChatById(filter, chatId) {
  // console.log(filter, chatId, field);
  let user = await userController.readOne(filter, {"chats": true, "users": true}, false)
  // console.log(user);
  const foundChat = user.chats.find(chat => chat.id == chatId && !chat.isDeleted);
  if(!foundChat){
    return null;
  }
    console.log(foundChat.isFavorite, "foundChat");
  return foundChat
}

// עדכון דגלים בצ'אט משתמש
async function updateUserChat(filter, chatId, field) {
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

// עבור עמודה שנייה
// קבלת מספר צאטים שלא נקראו 
async function getNotRead(userId) {
  console.log(userId);
  let { chats } = await userController.readOne({ _id: userId });
  // console.log(chats);
  const nums = {
    inbox: chats.filter(c => c.isRead == false && c.isDeleted == false && c.isReceived == true).length,
    send: chats.filter(c => c.isRead == false && c.isDeleted == false && c.isSent == true).length,
    favorites: chats.filter(c => c.isRead == false && c.isDeleted == false && c.isFavorite == true).length,
    deleted: chats.filter(c => c.isRead == false && c.isDeleted == false && c.isReceived == true).length,
  }
  // console.log(nums);
  return nums
}

// עבור עמודה שלישית
// קבלת רשימת צ'אטים לפי קטגוריה, עימוד, + סינון לפי חיפוש
async function getChatList({ userId, flags, input, pageNumber }) {
  // הוספת הגדרה של רק מה שלא נמחק
  flags = [...flags, "deleted"]
  // console.log(flags, input);
  // המרה
  const arrayFlags = flags.flatMap(flag => funcs[flag])
  // console.log(arrayFlags);
  // קבלת צאטים לפי קטגוריה
  let { chats } = await userController.readByFlags(userId, arrayFlags, { chats: true, users: true });
  // console.log(chats);
  // אם יש חיפוש - לסנן שוב
  if (input) {
    chats = filterArrayByString(chats, input.toLowerCase())
  }
  if(chats.length == 0) {return chats}
  chats = chats.sort((a, b) => new Date(b.chat.lastDate) - new Date(a.chat.lastDate));
  // console.log(chats);
  // עימוד
  const startIndex = (pageNumber - 1) * 7;
  const endIndex = pageNumber * 12;
  return chats
  .slice(0, endIndex)
}

// מיותרים---------------------------------------

// מיותר
// עדכון למצב קראתי אצל יוזר מסויים
async function updateReadChat(userId, chatId) {
  let user = await userController.readOne(userId);
  user.chats.find(c => c._id == chatId).isRead = true;
  userController.save(user)
  // let chatIndex = chats.findIndex(c => c._id == chatId)
  // userController.update({ _id: userId }, { $set: { [`chats.${chatIndex}.isRead`]: true } })
}
// כנ"ל
// עדכון למצב לא קראתי אצל יוזר מסויים
async function updateNotReadChat(userId, chatId) {
  let user = await userController.readOne(userId);
  user.chats.find(c => c._id == chatId).isRead = false;
  userController.save(user)
  // let chatIndex = chats.findIndex(c => c._id == chatId)
  // userController.update({ _id: userId }, { $set: { [`chats.${chatIndex}.isRead`]: true } })
}

// מיותר
// קבלת צאטים  של יוזר  לפי מספר קטגוריות
async function getChatsByFlags(userId, flags) {
  flags = [...flags, "deleted"]
  // console.log(flags);
  const arrayFlags = flags.flatMap(flag => funcs[flag])
  // console.log("🚀 ~ getChatsByFlags ~ arrayFlags:", arrayFlags)
  let { chats } = await userController.readByFlags(userId, arrayFlags, { chats: true, users: true });
  return chats
}

// מיותר כרגע
// קבלת צאטים לפי קטגוריה
async function getChats(userId, flag) {
  console.log(userId, flag);
  if (!funcs[flag]) throw { msg: 'no filter found' }
  let { chats } = await userController.readByFlags(userId, funcs[flag], { chats: true, users: true });
  return chats
}

//  מיותר
// קבלת יוזר-צאט - לפי מזהה צאט כללי
async function getUserChat(filter, chatId) {
  // console.log(filter, chatId, field);
  let user = await userController.readOne(filter)
  const foundChat = user.chats.find(chat => chat.chat == chatId);
  if(!foundChat){
    return null;
  }
    console.log(foundChat);
  return foundChat
}


module.exports = {
  createUser,
  updateUserById,
  updateNotifications,
  deleteUserById,
  getAllUsers,
  getUser,
  getUserById,
  getUserWithPassword,
  getMembersByEmail,


  // שייך לצ'אטים
  updateUserChat,
  getUserChatById,
  getNotRead,
  getChatList,

//  מיותרים
  getChatsByFlags,
  updateReadChat,
  updateNotReadChat,
  getUserChat,
  getChats,
}


// חיפוש בתוכן צ'אט
function filterArrayByString(arr, searchString) {
  if (arr.length == 0) return arr;
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