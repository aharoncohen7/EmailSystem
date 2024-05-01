const express = require("express")//ייבוא ספריה שמסוגלת לייצר 
const userChatsRouter = express.Router()
const userServices = require("../BL/user.services")

// עבור עמודה שנייה
// קבלת מספרי הצ'אטים שלא נקראו
userChatsRouter.get('/not-read', async (req, res) => {
    try {
        let result = await userServices.getNotRead(req.user._id)
        res.send(result)
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err.message)
    }
})

// עבור עמודה שלישית 
// קבלת רשימת צ'אטים לפי סינון - 
userChatsRouter.post('/chat-list', async (req, res) => {
    const parameters = {
        userId: req.user._id,
        flags: req.body.flags,
        input: req.body.input,
        pageNumber: req.body.pageNumber,
    }
    // console.log(req.body);
    try {
        let result = await userServices.getChatList(parameters)
        res.send(result)
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err.message)
    }
})

// עבור עמודה רביעית
// קבלת צאט לפי מזהה צאט אישי
userChatsRouter.get('/:chatId', async (req, res) => {
    console.log(req.user._id);
    try {
        let result = await userServices.getUserChatById({ _id: req.user._id }, req.params.chatId)
        res.send(result)
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err.message)
    }
})

//  עדכון דגלים בצ'אט מסויים - לפי מזהה של היוזר
// מעדכן תמיד את ההיפך
userChatsRouter.put("/:chatId/:filedToUpdate", async (req, res) => {
    // console.log("start update itemChat on userChats");
    try {
        const field = req.params.filedToUpdate;
        const userId = req.user._id;
        const chatId = req.params.chatId;
        // console.log(field, userId, chatId)              
        const updatedChat = await userServices.updateUserChat({ _id: userId }, chatId, field)
        // console.log(updatedChat);
        res.send(updatedChat)
    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }
});

// מיותרים ----------------------------------
// מיותר
// עדכון דגלים בצ'אט מסויים - לפי מזהה פנימי-כללי
userChatsRouter.put("/update-chat/:chatId/:filedToUpdate", async (req, res) => {
    console.log("start update itemChat2 !! on userChats");
    try {
        const field = req.params.filedToUpdate;
        const userId = req.user._id;
        //חיפוש הצאט אצל המשתמש
        const chat = await userServices.getUserChat({ _id: req.user._id }, req.params.chatId)
        // console.log(field, userId, chat.id)
        // עדכון הצ'אט אצל המשתמש
        const updatedChat = await userServices.updateUserChat({ _id: userId }, chat.id, field)
        // console.log(updatedChat);
        res.send(updatedChat)
    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }
});


// מיותר
// קבלת צ'אטים לפי מערך קטגוריות מסוימות
userChatsRouter.post('/flags', async (req, res) => {
    // console.log(req.body);
    try {
        let result = await userServices.getChatsByFlags(req.user._id, req.body.flags)
        res.send(result)
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err.message)
    }
})

// מיותר
// קבלת צ'אטים לפי קטגוריה 1 מסוימת
userChatsRouter.get('/by-flag/:flag', async (req, res) => {
    console.log(req.user._id);
    try {
        let result = await userServices.getChats(req.user._id, req.params.flag)
        res.send(result)
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err.message)
    }
})

// מיותר
// קבלת צאט לפי מזהה כללי -  פנימי
userChatsRouter.get('/by-id/:chatId', async (req, res) => {
    console.log(req.user._id);
    try {
        let result = await userServices.getUserChat({ _id: req.user._id }, req.params.chatId)
        res.send(result)
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err.message)
    }
})


module.exports = { userChatsRouter }



















// // דואר נכנס
// userChatsRouter.get("/inbox", async (req, res) => {
//     try {
//         const userId = req.user._id;
//         console.log(userId);
//         const allReceived = await userServices.getEmailsByFilter({_id:userId,
//             //  emails:{$elemMatch:{isReceived:true}}
//             }, "isReceived")
//         console.log("allReceived", allReceived);
//         res.send(allReceived)

//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// })


// דואר יוצא
// userChatsRouter.get("/outbox", async (req, res) => {
//     try {
//         const userId = req.user._id;
//         console.log(userId);
//         const allSent = await userServices.getEmailsByFilter({_id:userId, emails:{$elemMatch:{isSent:true}}})
//         console.log(allSent);
//         res.send(allSent)

//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// })


// מועדפים
// userChatsRouter.get("/favourites", async (req, res) => {
//     try {
//         const userId = req.user._id;
//         console.log(userId);
//         const favourites = await userServices.getEmailsByFilter({_id:userId, emails:{$elemMatch:{isFavorite:true}}})
//         console.log(favourites);
//         res.send(favourites)

//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// })


// לא נקרא
// userChatsRouter.get("/unread", async (req, res) => {
//     try {
//         const userId = req.user._id;
//         console.log(userId);
//         const allReceived = await userServices.getEmailsByFilter({_id:userId, emails:{$elemMatch:{isRead:false}}})
//         console.log(allReceived);
//         res.send(allReceived)

//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// })


// גנרית לכל דגל לא כולל נא נקראו
// userChatsRouter.get("/:isSomething", async (req, res) => {
//     try {
//         const byUserId = {_id: req.user._id}
//         const byField = req.params.isSomething
//         const filterdEmails = await userServices.getEmailsByFilter(byUserId, byField)
//         console.log("allReceived", filterdEmails);
//         res.send(filterdEmails)

//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// })





// // דואר נכנס
// usersEmailsRouter.get("/inbox", async (req, res) => {
//     try {
//         const userId = req.user._id;
//         console.log(userId);
//         const allReceived = await userServices.getEmailsByFilter({_id:userId,
//             //  emails:{$elemMatch:{isReceived:true}}
//             }, "isReceived")
//         console.log("allReceived", allReceived);
//         res.send(allReceived)

//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// })


// // דואר יוצא
// usersEmailsRouter.get("/outbox", async (req, res) => {
//     try {
//         const userId = req.user._id;
//         console.log(userId);
//         const allSent = await userServices.getEmailsByFilter({_id:userId, emails:{$elemMatch:{isSent:true}}})
//         console.log(allSent);
//         res.send(allSent)

//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// })


// // מועדפים
// usersEmailsRouter.get("/favourites", async (req, res) => {
//     try {
//         const userId = req.user._id;
//         console.log(userId);
//         const favourites = await userServices.getEmailsByFilter({_id:userId, emails:{$elemMatch:{isFavorite:true}}})
//         console.log(favourites);
//         res.send(favourites)

//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// })


// // לא נקרא
// usersEmailsRouter.get("/unread", async (req, res) => {
//     try {
//         const userId = req.user._id;
//         console.log(userId);
//         const allReceived = await userServices.getEmailsByFilter({_id:userId, emails:{$elemMatch:{isRead:false}}})
//         console.log(allReceived);
//         res.send(allReceived)

//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// })


// usersEmailsRouter.get("/:isSomething", async (req, res) => {
//     try {
//         const byUserId = {_id: req.user._id}
//         const byField = req.params.isSomething
//         const filterdEmails = await userServices.getEmailsByFilter(byUserId, byField)
//         console.log("allReceived", filterdEmails);
//         res.send(filterdEmails)

//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// })



// //  update email
// usersEmailsRouter.put("/:emailId", async (req, res) => {
//     console.log("start update email ");
//     try {
//         const field = req.body.filedToUpdate;
//         const userId = req.user._id;
//         const emailId = req.params.emailId;
//         console.log(field, userId, emailId)
//         const updatedEmail = await userServices.updateUserChat({_id:userId}, emailId,  field)
//         console.log(updatedEmail);
//        res.send(updatedEmail)
//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// });