const express = require('express'),
chatRouter = express.Router();
let chatServices = require('../BL/chat.services')

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
        // console.log("nbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
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
        const updatedChat = await chatServices.addMessageToChat(req.body)
        res.send(updatedChat)
       
    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }
})


module.exports = {chatRouter};