const { userRouter } = require("./user.router")
const { userChatsRouter } = require("./userChats.router")
const { chatRouter } = require("./chat.router")
// const { emailRouter } = require("./email.router")

module.exports = {
    userRouter,
    userChatsRouter,
    chatRouter
    // ,emailRouter
}
