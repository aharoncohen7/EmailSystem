const express = require("express")//ייבוא ספריה שמסוגלת לייצר 
const authRouter = express.Router()
const userServices = require("../BL/user.services")
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth");
const cloudinary = require("../cloudnary");
// const jwt = require("jsonwebtoken");
// const secret = process.env.JWT_SECRET



// יצירת יוזר
authRouter.post("/register", async (req, res) => {
    console.log("start create new user=======================================================================================");

    try {
        const { body } = req;
        // console.log(body.avatar);
        if (body.avatar) {
            // saveImgToCloud2(body.avatar, "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        const result = await cloudinary.uploader.upload(body.avatar,{
            folder: "avatars"
        })
        console.log("🚀 ~ authRouter.post ~ body:", result.secure_url)
        body.avatar = result.secure_url
        }
        const userToCreate = {
            fullName: body.firstName + " " + body.lastName,
            email: body.email,
            password: bcrypt.hashSync(body.password, 8),
            avatar: body.avatar || 'https://www.w3schools.com/howto/img_avatar.png'
        }
        const newUser = await userServices.createUser(userToCreate)
        console.log(newUser);
        res.send(newUser)
    }
    catch (err) {
        res.status(500).send(err.msg || err.message || "wrong")
    }
});
// התחברות
authRouter.post("/login", async (req, res) => {
    console.log("start login");
    try {
        const { body } = req;
        const userFromDB = await userServices.getUserWithPassword({email: body.email})
        // console.log("🚀 ~ userRouter.post ~ userFromDB:", userFromDB)
        if(!userFromDB) throw "User not found"
        console.log("11111111111111111111111r");
        if(!bcrypt.compareSync(body.password, userFromDB.password)) throw "Not the same password"
        console.log("g22222222222222222222222");
        const token = await auth.generate({_id: userFromDB._id})
        if(!token) throw "Token not found"
        console.log("g3333333333333333333332");
        // console.log("🚀 ~ authRouter.post ~ token:", token)
        const response = {token, _id: userFromDB._id, fullName: userFromDB.fullName,  email: userFromDB.email, avatar: userFromDB.avatar}
        res.send(response)
    }
    catch (err) {
        res.status(500).send(err.msg || err.message || "wrong")
    }
});

authRouter.all("/refresh-token", auth.auth,  async (req, res) => {
    // console.log("start refresh-token", req);
    try {
        const user = await userServices.getUserById({ _id: req.user })
        // console.log(user);
        res.send(user)
       
    }
    catch (err) {
        res.status(500).send(err.msg || err.message || "wrong")
    }
});





module.exports = { authRouter }