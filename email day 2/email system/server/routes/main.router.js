const { userRouter } = require("./user.router")
const { userChatsRouter } = require("./userChats.router")
const { chatRouter } = require("./chat.router")
const {authRouter } = require("./auth.router")
const {imgRouter } = require("./img.router")
// const { emailRouter } = require("./email.router")

module.exports = {
    userRouter,
    userChatsRouter,
    chatRouter,
    authRouter,
    imgRouter
}
