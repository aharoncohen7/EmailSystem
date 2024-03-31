const userController = require('./controllers/user.controller')
const userModel = require('./models/user.model')
const messageController = require('./controllers/message.controller')
const messageModel = require('./models/message.model')
const emailController = require('./controllers/email.controller')
const emailModel = require('./models/email.model')



async function go() {
    require('dotenv').config()
    require('./db').connect()
    await userModel.collection.drop()
    await messageModel.collection.drop()
    await emailModel.collection.drop()

    console.log("#############################");

    const users = [
        {
            email: "user1@example.com",
            fullName: "Moshe Cohen",
            password: "123qwe",
            avatar: "http://",
            emails: [],
        },
        {
            email: "user2@example.com",
            fullName: "Haim Levi",
            password: "123456",
            avatar: "http://",
            emails: [],
        },
        {
            email: "user3@example.com",
            fullName: "Mor Noam",
            password: "123qwe",
            avatar: "http://",
            emails: [],
        },
    ]

    let ru1 = await userController.create(users[0])
    let ru2 = await userController.create(users[1])
    let ru3 = await userController.create(users[2])

    const msg = [{
        to: ["user1@example.com"],
        from: "user2@example.com",
        date: "2024-03-21T10:00:00.000Z",
        content: "Greeting and you??",
        subject: "Hello, how are you?"
    }, {
        to: ["user2@example.com"],
        from: "user1@example.com",
        date: "2024-03-21T10:08:00.000Z",
        content: "Fine, and you?",
        subject: "Hello, how are you?"
    }, {
        to: ["user1@example.com"],
        from: "user2@example.com",
        date: "2024-03-21T10:24:00.000Z",
        content: "Walla Sababa !!",
        subject: "Hello, how are you?"
    },


    // --------------------------------------
    {
        to: ["user2@example.com"],
        from: "user3@example.com",
        date: "2024-03-20T09:30:00.000Z",
        content: "Could you please send me the report?",
        subject: "Report Request"
    },
    {
        to: ["user3@example.com"],
        from: "user2@example.com",
        date: "2024-03-20T10:45:00.000Z",
        content: "whyyyyy?!?!",
        subject: "Report Request"
    }, {
        to: ["user2@example.com"],
        from: "user3@example.com",
        date: "2024-03-20T10:57:00.000Z",
        content: "why whyyyyyyy?!?!",
        subject: "Report Request"
    }, {
        to: ["user3@example.com"],
        from: "user2@example.com",
        date: "2024-03-21T07:30:00.000Z",
        content: "Ok, i'm fired!",
        subject: "Report Request"
    },

        // -------------------------------------
    ]

    const msgDB = []
    for (m of msg) {
        let mm = await messageController.create(m)
        msgDB.push(mm)
    }

    const emails = [{
        subject: "Hello, how are you?",
        msg: [msgDB[0]._id, msgDB[1]._id, msgDB[2]._id],
        lastDate: "2024-03-21T10:24:00.000Z"
    }, {
        subject: "Report Request",
        msg: [msgDB[3]._id, msgDB[4]._id, msgDB[5]._id, msgDB[6]._id],
        lastDate: "2024-03-21T07:30:00.000Z"
    }]

    const emailDB = []
    for(e of emails){
        let ee = await emailController.create(e)
        emailDB.push(ee)
    }
 

    ru1.emails.push({
        email: emailDB[0]._id,
        isSent: true,
        isRecieved: true,
        isFavorite: false,
        isDeleted: false,
    })

    ru1.save()

    ru2.emails.push({
        email: emailDB[0]._id,
        isSent: true,
        isRecieved: true,
        isFavorite: false,
        isDeleted: false,
    },
        {
            email: emailDB[1]._id,
            isSent: true,
            isRecieved: true,
            isFavorite: false,
            isDeleted: false,
        })
    ru2.save()

    ru3.emails.push({
        email: emailDB[1]._id,
        isSent: true,
        isRecieved: true,
        isFavorite: false,
        isDeleted: false,
    })
    ru3.save()

    console.log("#############################");

}

go()