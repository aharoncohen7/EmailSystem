const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({

    to: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }],
    from: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    content: {
        type:String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
   
})

// messageSchema.index({content: 1, subject: 1}, {required:  true})

const messageModel = mongoose.model("message", messageSchema)

module.exports = messageModel


