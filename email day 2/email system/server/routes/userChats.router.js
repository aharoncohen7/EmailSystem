const express = require("express")//ייבוא ספריה שמסוגלת לייצר 
const userChatsRouter = express.Router()
const userServices = require("../BL/user.services")
const chatServices = require("../BL/chat.services")


//של יוזר
// קבלת מספרי הצ'אטים שלא נקראו
userChatsRouter.get('/not-read', async (req, res) => {
    try {
        let result = await chatServices.getNotRead(req.user._id)
        res.send(result)
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err.message)
    }
})


//של יוזר
// קבלת צ'אטים לפי קטגוריה 1 מסוימת
userChatsRouter.get('/by-plag/:flag', async (req, res) => {
    console.log(req.user._id);
    try {
        let result = await chatServices.getChats(req.user._id, req.params.flag)
        res.send(result)
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err.message)
    }
})


//כללי
// // קבלת צ'אט מסויים להצגה כשרשור באתר
// userChatsRouter.get('/:chatId', async (req, res) => {
//     const userId = req.user._id;
//     const chatId = req.params.chatId;
//     try {
//         let result = await chatServices.getChatById({userId, chatId})
//         res.send(result)
//     }
//     catch (err) {
//         console.log(err);
//         res.status(400).send(err.message)
//     }
// })


//של יוזר
// קבלת צ'אטים לפי מערך קטגוריות מסוימות
userChatsRouter.post('/flags', async (req, res) => {
    console.log(req.body);
    try {
        let result = await chatServices.getChatsByFlags(req.user._id, req.body.flags)
        res.send(result)
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err.message)
    }
})













// בעייתי, מעדכן תמיד את ההיפך
//של יוזר
// מקבל מזהה מטוקן רק עבור משתמש נוכחי
// עדכון דגלים בצ'אט מסויים
// עדכונים של כמה חברים יגיע רק בעת פעולות אחרות כמו שליחת הודעה ואין צורך באנד פוינט למצב כזה
userChatsRouter.put("/?/:chatId", async (req, res) => {
    console.log("start update itemChat on userChats");
    try {
        const field = req.body.filedToUpdate;
        const userId = req.user._id;
        const chatId = req.params.chatId;  
        // console.log(field, userId, chatId)              
        const updatedChat = await userServices.updateChat({_id: userId}, chatId,  field)
        console.log(updatedChat);
        res.send(updatedChat)
    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }
});


module.exports = { userChatsRouter }



















// // דואר נכנס
// userChatsRouter.get("/inbox", async (req, res) => {
//     try {
//         const userId = req.user._id;
//         console.log(userId);                   
//         const allRecieved = await userServices.getEmailsByFilter({_id:userId,
//             //  emails:{$elemMatch:{isRecieved:true}}
//             }, "isRecieved")
//         console.log("allRecieved", allRecieved);
//         res.send(allRecieved)

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
//         const allRecieved = await userServices.getEmailsByFilter({_id:userId, emails:{$elemMatch:{isRead:false}}})
//         console.log(allRecieved);
//         res.send(allRecieved)

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
//         console.log("allRecieved", filterdEmails);
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
//         const allRecieved = await userServices.getEmailsByFilter({_id:userId,
//             //  emails:{$elemMatch:{isRecieved:true}}
//             }, "isRecieved")
//         console.log("allRecieved", allRecieved);
//         res.send(allRecieved)

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
//         const allRecieved = await userServices.getEmailsByFilter({_id:userId, emails:{$elemMatch:{isRead:false}}})
//         console.log(allRecieved);
//         res.send(allRecieved)

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
//         console.log("allRecieved", filterdEmails);
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
//         const updatedEmail = await userServices.updateChat({_id:userId}, emailId,  field)
//         console.log(updatedEmail);
//        res.send(updatedEmail)
//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// });