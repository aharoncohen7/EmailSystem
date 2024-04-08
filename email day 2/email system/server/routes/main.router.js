const { emailRouter } = require("./email.router")
const { userRouter } = require("./user.router")
const { usersEmailsRouter } = require("./user'sEmails.router")
const { chatRouter } = require("./chat.router")

module.exports = {
    emailRouter,
    userRouter,
    usersEmailsRouter,
    chatRouter
}
