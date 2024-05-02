const express = require("express")//ייבוא ספריה שמסוגלת לייצר 
const authRouter = express.Router()
const userServices = require("../BL/user.services")
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth")
// const jwt = require("jsonwebtoken");
// const secret = process.env.JWT_SECRET


// יצירת יוזר
authRouter.post("/register", async (req, res) => {
    console.log("start create new user");
    
    try {
        const { body } = req;
        const userToCreate = {
            fullName: body.firstName + " " + body.lastName,
            email: body.email,
            password: bcrypt.hashSync(body.password, 8),
            avatar: 'https://www.w3schools.com/howto/img_avatar.png'
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
        console.log("🚀 ~ userRouter.post ~ userFromDB:", userFromDB)
        if(!userFromDB) throw "User not found"
        if(!bcrypt.compareSync(body.password, userFromDB.password)) throw "Not the same password"
        const token = await auth.generate({_id: userFromDB._id})
        console.log(token);
        const response = {token, _id: userFromDB._id, fullName: userFromDB.fullName,  email: userFromDB.email, avatar: userFromDB.avatar}
        res.send(response)
    }
    catch (err) {
        res.status(500).send(err.msg || err.message || "wrong")
    }
});



authRouter.all("/refresh-token", auth.auth,  async (req, res) => {
    console.log("start refresh-token", req);
    try {
        const user = await userServices.getUserById({ _id: req.user })
        console.log(user);
        res.send(user)
       
    }
    catch (err) {
        res.status(500).send(err.msg || err.message || "wrong")
    }
});





module.exports = { authRouter }