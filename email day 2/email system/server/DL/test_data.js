const userController = require('./controllers/user.controller')
const userModel = require('./models/user.model')
const chatController = require('./controllers/chat.controller')
const chatModel = require('./models/chat.model')



async function go() {
    require('dotenv').config()
    require('./db').connect()
    await userModel.collection.drop()
    await chatModel.collection.drop()

    console.log("###########  START  #########");

    const users = [
        {
            email: "user1@example.com",
            fullName: "Moshe Cohen",
            password: "123qwe",
            avatar: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesar&accessoriesType=Sunglasses&hairColor=Auburn&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Side&eyebrowType=RaisedExcitedNatural&mouthType=Smile&skinColor=Yellow",
            chats: [],
        },
        {
            email: "user2@example.com",
            fullName: "Haim Levi",
            password: "123456",
            avatar: "https://avataaars.io/?avatarStyle=Circle&topType=LongHairFro&accessoriesType=Kurt&hairColor=SilverGray&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Sad&skinColor=Light",
            chats: [],
        },
        {
            email: "user3@example.com",
            fullName: "Mor Noam",
            password: "123qwe",
            avatar: "https://avataaars.io/?avatarStyle=Circle&topType=WinterHat2&accessoriesType=Prescription01&hatColor=PastelGreen&facialHairType=MoustacheFancy&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
            chats: [],
        },
        {
            email: "user4@example.com",
            fullName: "Sivan Tov",
            password: "123qwe21s",
            avatar: "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
            chats: [],
        },
        {
            email: "user5@example.com",
            fullName: "Roni Malkan",
            password: "23w32q",
            avatar: "https://avataaars.io/?avatarStyle=Circle&topType=Eyepatch&facialHairType=BeardMajestic&facialHairColor=Platinum&clotheType=ShirtScoopNeck&clotheColor=PastelGreen&eyeType=Dizzy&eyebrowType=RaisedExcitedNatural&mouthType=Smile&skinColor=Tanned",
            chats: [],
        },
        {
            email: "user6@example.com",
            fullName: "Smadar Omer",
            password: "123qwe",
            avatar: "https://avataaars.io/?avatarStyle=Circle&topType=LongHairNotTooLong&accessoriesType=Blank&hairColor=Blonde&facialHairType=Blank&clotheType=ShirtScoopNeck&clotheColor=PastelGreen&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Smile&skinColor=Tanned",
            chats: [],
        },

    ]

    let ru1 = await userController.create(users[0])
    let ru2 = await userController.create(users[1])
    let ru3 = await userController.create(users[2])
    let ru4 = await userController.create(users[3])
    let ru5 = await userController.create(users[4])
    let ru6 = await userController.create(users[5])
    // let ru7 = await userController.create(users[6])

    const members = [ru1, ru2, ru3, ru4, ru5, ru6];

    const chats = [
        {
            subject: "Hello, how are you?",
            members: [ru1._id, ru2._id, ru4._id, ru6._id],
            msg: [{
                from: ru2._id,
                date: "2024-03-21T10:00:00.000Z",
                content: "Greeting and you??",

            }, {
                from: ru1._id,
                date: "2024-03-21T10:08:00.000Z",
                content: "Fine, and you?",
            }, {
                from: ru6._id,
                date: "2024-03-21T10:24:00.000Z",
                content: "Walla Sababa !!",
            },],
            lastDate: "2024-03-21T10:24:00.000Z"
        },
        {
            subject: "Report Request",
            members: [ru2._id, ru3._id, ru4._id, ru5._id, ru6._id],
            msg: [{
                from: ru3._id,
                date: "2024-03-20T09:30:00.000Z",
                content: "Could you please send me the report?",
            },
            {
                from: ru2._id,
                date: "2024-03-20T10:45:00.000Z",
                content: "whyyyyy?!?!",
            }, {

                from: ru3._id,
                date: "2024-03-20T10:57:00.000Z",
                content: "why whyyyyyyy?!?!",
            }, {
                from: ru6._id,
                date: "2024-03-21T07:30:00.000Z",
                content: "Ok, i'm fired!",
            },],
            lastDate: "2024-03-21T07:30:00.000Z"
        },
        {
            subject: "Meeting Reminder",
            members: [ru2._id, ru3._id],
            msg: [
                {
                    from: ru2._id,
                    date: "2024-04-08T11:00:00.000Z",
                    content: "Just a reminder about our meeting tomorrow.",
                },
                {
                    from: ru3._id,
                    date: "2024-04-08T11:05:00.000Z",
                    content: "Thanks for the heads-up. Looking forward to it!",
                }
            ],
            lastDate: "2024-04-08T11:05:00.000Z"
        },
        {
            subject: "Vacation Plans",
            members: [ru5._id, ru6._id],
            msg: [
                {
                    from: ru5._id,
                    date: "2024-04-08T12:00:00.000Z",
                    content: "I'm thinking of taking a vacation next month.",
                },
                {
                    from: ru6._id,
                    date: "2024-04-08T12:10:00.000Z",
                    content: "That sounds like a great idea! Where are you planning to go?",
                }
            ],
            lastDate: "2024-04-08T12:10:00.000Z"
        },
        {
            subject: "New Feature Discussion",
            members: [ru1._id, ru3._id, ru4._id],
            msg: [
                {
                    from: ru1._id,
                    date: "2024-04-08T13:00:00.000Z",
                    content: "I have some ideas for a new feature. Can we discuss?",
                },
                {
                    from: ru3._id,
                    date: "2024-04-08T13:15:00.000Z",
                    content: "Sure! Let's schedule a meeting to brainstorm.",
                },
                {
                    from: ru4._id,
                    date: "2024-04-08T13:30:00.000Z",
                    content: "Count me in! I'm excited to hear your ideas.",
                }
            ],
            lastDate: "2024-04-08T13:30:00.000Z"
        },
        {
            subject: "Team Building Event",
            members: [ru2._id, ru5._id, ru6._id],
            msg: [
                {
                    from: ru2._id,
                    date: "2024-04-08T14:00:00.000Z",
                    content: "Let's organize a team-building event next month.",
                },
                {
                    from: ru5._id,
                    date: "2024-04-08T14:15:00.000Z",
                    content: "That sounds like a fantastic idea! Any suggestions?",
                },
                {
                    from: ru6._id,
                    date: "2024-04-08T14:30:00.000Z",
                    content: "I'll check some options and get back to you.",
                }
            ],
            lastDate: "2024-04-08T14:30:00.000Z"
        },
        {
            subject: "Budget Discussion",
            members: [ru1._id, ru2._id, ru4._id],
            msg: [
                {
                    from: ru1._id,
                    date: "2024-04-08T15:00:00.000Z",
                    content: "We need to discuss the budget for the upcoming project.",
                },
                {
                    from: ru2._id,
                    date: "2024-04-08T15:15:00.000Z",
                    content: "Agreed. Let's schedule a meeting to review.",
                },
                {
                    from: ru4._id,
                    date: "2024-04-08T15:30:00.000Z",
                    content: "I'll prepare the necessary documents for the meeting.",
                }
            ],
            lastDate: "2024-04-08T15:30:00.000Z"
        }]

    const chatDB = []
    for (e of chats) {
        let ee = await chatController.create(e)
        let first = members.find(m => m._id == ee.msg[0].from);

        first.chats.push({
            chat: ee._id,
            isSent: true,
            isRecieved: ee.members.includes(first._id, 1),
        })
        await first.save();

        ee.members
            .filter(m => m._id != first._id)
            .forEach(async m =>{
                let mm = members.find(mem=>mem._id==m._id)
                mm.chats.push({
                    chat: ee._id,
                    isRecieved: true,
                })
                await mm.save()
            })
        chatDB.push(ee)
    }


    // ru1.chats.push({
    //     chat: chatDB[0]._id,
    //     isSent: true,
    //     isRecieved: true,
    //     isFavorite: false,
    //     isDeleted: false,
    // })

    // ru1.save()

    // ru2.chats.push({
    //     chat: chatDB[0]._id,
    //     isSent: true,
    //     isRecieved: true,
    //     isFavorite: false,
    //     isDeleted: false,
    // },
    //     {
    //         chat: chatDB[1]._id,
    //         isSent: true,
    //         isRecieved: true,
    //         isFavorite: false,
    //         isDeleted: false,
    //     })
    // ru2.save()

    // ru3.chats.push({
    //     chat: chatDB[1]._id,
    //     isSent: true,
    //     isRecieved: true,
    //     isFavorite: false,
    //     isDeleted: false,
    // })
    // ru3.save()

    console.log("###########  END  ##########");

}

go()