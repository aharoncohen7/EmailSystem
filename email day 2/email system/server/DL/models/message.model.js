const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({

    to: [{
        type: String,
        required: true
    }],
    from: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    // isRead: {
    //     type: Boolean,
    //     default: false
    // },
    subject: String,
    content: {
        type:String,
        required: true
    }
})

// messageSchema.index({content: 1, subject: 1}, {required:  true})

const messageModel = mongoose.model("message", messageSchema)

module.exports = messageModel


