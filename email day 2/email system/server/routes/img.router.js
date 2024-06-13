const express = require("express")
const imgRouter = express.Router()
const cloudinary = require("../cloudnary");

// יצירת URLs
imgRouter.post("/get-url", async (req, res) => {
    console.log("start get-url");

    try {
        const { body } = req;
        const result = await cloudinary.uploader.upload(body.img,{
            folder: "chat-images"
        })
        console.log("🚀 ~ authRouter.post ~ body:", result.secure_url)
        res.send(result.secure_url)
    }
    catch (err) {
        res.status(500).send(err.msg || err.message || "wrong")
    }
});



module.exports = { imgRouter };