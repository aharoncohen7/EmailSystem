const mongoose = require("mongoose");
require("./message.model")

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
    }
})



const emailModel =  mongoose.model("email", emailSchema)


module.exports = emailModel









// const mongoose = require('mongoose')
// require('./message.model')

// const emailSchema = new mongoose.Schema({
//     subject: {
//         type: String
//     },

//     msg: [{
//         type: mongoose.SchemaTypes.ObjectId,
//         ref:'message'
//     }],

//     lastDate: {
//         type: Date
//     },
//     isRead: {
//         type: Boolean,
//         default: false
//     },
    
// })

// const emailModel = mongoose.model('email', emailSchema)

// module.exports = emailModel