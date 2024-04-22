const express = require('express'),
chatRouter = express.Router();
let chatServices = require('../BL/chat.services')

//כללי
//קבלת צ'אט מסויים 
// chatRouter.get("/:chatId", async (req, res) => {
//     try {
//         // const userId = req.user._id; 
//         const chatId = req.params.chatId;                
//         const allmsg = await chatServices.getAllChatMsg(chatId)
//         console.log(allmsg );
//         res.send(allmsg)
//     }
//     catch (err) {
//         res.status(400).send(err.msg || err.message || "wrong")
//     }
// })


//כללי
// קבלת צ'אט מסויים להצגה כשרשור באתר
chatRouter.get('/:chatId', async (req, res) => {
    const userId = req.user._id;
    const chatId = req.params.chatId;
    try {
        let result = await chatServices.getChatById(chatId, userId)
        res.send(result)
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err.message)
    }
})

// כללי
// פתיחת צ'אט חדש
chatRouter.post("/", async (req, res) => {
    // גוף הבקשה לדוגמה
    // body = {
    //     subject: "Hello, how are you?",
    //     content: "Greeting and you??",
    //     members: ['06152ce6cdf66ca1d1a479f6', '16152ce6cdf66ca1d1a479f8', '26152ce6cdf66ca1d1a479f1'],
    //  
    // }
    console.log("start new email ");
    try {
        req.body.from = req.user._id;  
        // console.log(req.body.from);       
        const newChat = await chatServices.sendNewChat(req)
        console.log("nbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
        res.send(newChat)
       
    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }
})


// שליחת הודעה בצ'אט קיים
chatRouter.put("/:chatId", async (req, res) => {
    console.log("start add new message to old chat");
    try {
        req.body.from = req.user._id;
        req.body.chatId = req.params.chatId;
        // console.log(req.user._id);       
        const updatedChat = await chatServices.addMessageToChat(req.body)
        // console.log(newEmail);
        res.send(updatedChat)
       
    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }
})

module.exports = {chatRouter};