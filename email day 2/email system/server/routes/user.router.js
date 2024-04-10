const express = require("express")//ייבוא ספריה שמסוגלת לייצר 
const userRouter = express.Router()
const userServices = require("../BL/user.services")


// קבלת כל היוזרים
userRouter.get("/", async (req, res) => {
    console.log("start get all");
    try {
        const users = await userServices.getAll()
        console.log(users);
        res.send(users)
    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }
});

// קבלת יוזר לפי מזהה
userRouter.get("/:userId", async (req, res) => {
    console.log("start get user by id");
    const userId = req.params.userId;
    try {
        const user = await userServices.getById({_id: userId})
        console.log(user);
        res.send(user)
    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }
});


// יצירת יוזר
userRouter.post("/", async (req, res) => {
    console.log("start create new user");
    const userToCreate = req.body;
    console.log(userToCreate);
    try {
        const newUser = await userServices.create(userToCreate)
        console.log(newUser);
        res.send(newUser)
    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }
});


// מחיקת יוזר עדכון
userRouter.put("/:userId", async (req, res) => {
    console.log("start delete user");
    const userId = req.params.userId;
    try {
        const updatedUser = await userServices.deleteById(userId)
        console.log(updatedUser);
        res.send(updatedUser)
    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }
});


module.exports = { userRouter }


















// // דואר נכנס
// userRouter.get("/emails/inbox", async (req, res) => {
//     try {
//         const userId = req.user._id;
//         console.log(userId);                   
//         const allRecieved = await userServices.getEmailsByFilter({_id:userId, emails:{$elemMatch:{isRecieved:true}}})
//         console.log(allRecieved);
//         res.send(allRecieved)

//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// })


// // דואר יוצא
// userRouter.get("/emails/outbox", async (req, res) => {
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
// userRouter.get("/emails/favourites", async (req, res) => {
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
// userRouter.get("/emails/unread", async (req, res) => {
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



// //  update email 
// userRouter.put("/emails/:emailId", async (req, res) => {
//     console.log("start update email ");
//     try {
//         const field = req.body.filedToUpdate;
//         const userId = req.user._id;
//         const emailId = req.params.emailId;  
//         console.log(field, userId, emailId)              
//         const updatedEmail = await userServices.updateChat({_id:userId, emails:{$elemMatch:{email:{_id: emailId}}}}, field)
//         console.log(updatedEmail);
//        res.send(updatedEmail)
//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// });



