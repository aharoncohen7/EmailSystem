const mongoose = require('mongoose')
require('./chat.model')


const notificationsEnum = ['new_message', 'medium', 'hard', 'extreme'];

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: false
    },
    avatar: String,

    chats: [{
        chat: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'chat'
        },
        isSent: { type: Boolean, default: false },
        isReceived: { type: Boolean, default: false },
        isFavorite: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
        isDraft: { type: Boolean, default: false },
        isRead: { type: Boolean, default: false },
        labels: [String]
    }],
    notifications: [{
        msg: {
            type: String,
            enum: notificationsEnum
        },
        // from: {
        //     type: mongoose.SchemaTypes.ObjectId,
        //     ref: 'user',
        // },
        from: String,
        isRead: { type: Boolean, default: false },
        timestamp: { type: Date, default: Date.now }
    }],
    isActive: {
        type: Boolean,
        default: true
    }
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel

async function go() {
    require('dotenv').config()
    require('../db').connect()
    let chats2 = await userModel.findOne({ _id: "660d26b92a155d99889d3942" }).populate('chats.chat')
    let { chats } = await chats2.populate('chats.chat.msg')//.populate('chats.chat.to');
    // console.log(chats[0].chat);
    let res = chats.filter(c => c.isReceived)
    console.log(res);

}
// go()
















// }],
// msgSent: [{
//     email: {
//         type: mongoose.SchemaTypes.ObjectId,
//         ref: 'email'
//     },
//     side: {
//         type: String,
//         enum: ['sent', "received"],

//     },
//     status: {
//         type: String,
//         enum: ['inbox', "deleted", "super-deleted"],
//         default: 'inbox'
//     }