const express = require('express'),
    chatRouter = express.Router();
let chatServices = require('../BL/chat.services')
const cloudinary = require("../cloudnary");

// פתיחת צ'אט חדש
chatRouter.post("/", async (req, res) => {
    // גוף הבקשה לדוגמה
    // req.body = {
    //     subject: "Hello, how are you?",
    //     content: "Greeting and you??",
    //     members: ['06152ce6cdf66ca1d1a479f6', '16152ce6cdf66ca1d1a479f8', '26152ce6cdf66ca1d1a479f1'],
    //     image: '06152ce6cdf66ca1d1a479f616152ce6cdf66ca1d1a479f826152ce6cdf66ca1d1a479f1',
    //  
    // }
    // console.log("start new email ");
    if (req.body.image) {
        const result = await cloudinary.uploader.upload(req.body.image, {
            folder: "images"
        })
        req.body.image = result.secure_url
    }
    try {
        req.body.from = req.user._id;
        // console.log(req.body.from);       
        const newChat = await chatServices.sendNewChat(req)
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


module.exports = { chatRouter };