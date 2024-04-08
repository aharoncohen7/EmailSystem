const mongoose = require('mongoose')
require('./user.model')

const messageSchema = new mongoose.Schema({
    from: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'user',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: String,
})

const chatSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },

    msg: [messageSchema],

    members: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
    }],

    lastDate: Date

})

const chatModel = mongoose.model('chat', chatSchema)

module.exports = chatModel