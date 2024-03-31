const express = require("express")//ייבוא ספריה שמסוגלת לייצר 
const usersEmailsRouter = express.Router()
const userServices = require("../BL/user.services")



// דואר נכנס
usersEmailsRouter.get("/inbox", async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(userId);                   
        const allRecieved = await userServices.getEmailsByFilter({_id:userId,
            //  emails:{$elemMatch:{isRecieved:true}}
            }, "isRecieved")
        console.log("allRecieved", allRecieved);
        res.send(allRecieved)

    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }
})


// דואר יוצא
usersEmailsRouter.get("/outbox", async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(userId);                   
        const allSent = await userServices.getEmailsByFilter({_id:userId, emails:{$elemMatch:{isSent:true}}})
        console.log(allSent);
        res.send(allSent)

    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }
})


// מועדפים
usersEmailsRouter.get("/favourites", async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(userId);                   
        const favourites = await userServices.getEmailsByFilter({_id:userId, emails:{$elemMatch:{isFavorite:true}}})
        console.log(favourites);
        res.send(favourites)

    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }
})


// לא נקרא
usersEmailsRouter.get("/unread", async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(userId);                   
        const allRecieved = await userServices.getEmailsByFilter({_id:userId, emails:{$elemMatch:{isRead:false}}})
        console.log(allRecieved);
        res.send(allRecieved)

    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }
})


usersEmailsRouter.get("/:isSomething", async (req, res) => {
    try {
        const byUserId = {_id: req.user._id} 
        const byField = req.params.isSomething                  
        const filterdEmails = await userServices.getEmailsByFilter(byUserId, byField)
        console.log("allRecieved", filterdEmails);
        res.send(filterdEmails)

    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }
})



//  update email 
usersEmailsRouter.put("/:emailId", async (req, res) => {
    console.log("start update email ");
    try {
        const field = req.body.filedToUpdate;
        const userId = req.user._id;
        const emailId = req.params.emailId;  
        console.log(field, userId, emailId)              
        const updatedEmail = await userServices.updateEmail({_id:userId}, emailId,  field)
        console.log(updatedEmail);
       res.send(updatedEmail)
    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }
});



module.exports = { usersEmailsRouter }