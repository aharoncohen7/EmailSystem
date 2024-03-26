const express = require("express")//ייבוא ספריה שמסוגלת לייצר 
const emailRouter = express.Router()
const emailServices = require("../BL/email.services")
const userServices = require("../BL/user.services")


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

module.exports = { emailRouter }



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