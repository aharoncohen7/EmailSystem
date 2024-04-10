// const express = require("express")//ייבוא ספריה שמסוגלת לייצר 
// const emailRouter = express.Router()
// const emailServices = require("../BL/email.services")
// const userServices = require("../BL/user.services")



// emailRouter.get("/:emailId", async (req, res) => {
//     try {
//         const userId = req.user._id; 
//         const emailId = req.params.emailId;                
//         const allmsg = await emailServices.getAllEmailMsg(emailId)
//         console.log(allmsg );
//         res.send(allmsg)

//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// })

// emailRouter.post("/", async (req, res) => {
//     console.log("start new email ");
//     try {
//         req.body.msg.from = req.user._id;  
//         // console.log(req.user._id);       
//         const newEmail = await emailServices.sendNewEmail(req.body.msg, req.body.subject)
//         // console.log(newEmail);
//         res.send(newEmail)
       
//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// })


// emailRouter.put("/", async (req, res) => {
//     console.log("start add new message to old email");
//     try {
//         req.body.msg.from = req.user._id;  
//         // console.log(req.user._id);       
//         const updatedEmail = await emailServices.addMessageToEmail(req.body.msg, req.body.emailId)
//         // console.log(newEmail);
//         res.send(updatedEmail)
       
//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// })







// emailRouter.get("/inbox", async (req, res) => {
//     try {
//         const userId = req.user._id;
//         console.log(userId);                   
//         const allRecieved = await userServices.getById({_id:userId, emails:{$elemMatch:{isRecieved:true}}}, true)
//         console.log(allRecieved);
//         res.send(allRecieved)

//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// })

// emailRouter.get("/:emailId", async (req, res) => {




// })

// module.exports = { emailRouter }





























// ישן




















// emailRouter.post("/", async (req, res) => { 
//     try {
//         console.log(req.body);

//         res.send({
//             _id: "aoksd9328sakd932is",
//             subject,
//             content,
//             to,
//             from: user.email
//         })
//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// });


// emailRouter.post("/", async(req, res)=>{



// })  