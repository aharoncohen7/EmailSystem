const mongoose = require("mongoose");
require("./message.model")
require("./email.model")


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
        required: true,
        select: true,
    },

    avatar: String,
    
    isActive: {
        type: Boolean, 
        default: true
    },

    emails: [{
        email: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'email'
        },
        isRead: {
            type: Boolean, 
            default: false
        },
        isSent: Boolean,
        isRecieved: Boolean,
        isFavorite: Boolean,
        isDeleted: Boolean
    }],

})


const userModel = mongoose.model("user", userSchema)

module.exports = userModel

















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