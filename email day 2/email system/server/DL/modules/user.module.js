const mongoose = require("mongoose");
require("./message.module")

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        // required: true,
        select: true,
    },

    avatar: String,

    emails: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'message'
    }],
    isSent: Boolean,
    isRecieved: Boolean, 
    isFavorite: Boolean,
    isDeleted: Boolean
})
const userModule = mongoose.model("user", userSchema)

module.exports = {
    userModule
}


// }],
// msgSent: [{
//     email: {
//         type: mongoose.SchemaTypes.ObjectId,
//         ref: 'email'
//     },
//     side: {
//         type: String,
//         enum: ['sent', "recieved"],

//     },
//     status: {
//         type: String,
//         enum: ['inbox', "deleted", "super-deleted"],
//         default: 'inbox'
//     }