const mongoose = require("mongoose");
require("./message.module")

const emailSchema = new mongoose.Schema({

    subject: {
        type: String
    },
    msg: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'message'
    }],
    lastDate: {
        type: Date
    },
    isRead: {
        type: Boolean,
        default: false
    },
    
})

const emailModule =  mongoose.model("email", emailSchema)


module.exports = {
    emailModule
}