//import from module
// const messageModel = require("../models/message.model")

//CRRUD
// async function create(data){
//     return await messageModel.create(data)
// }
// async function read(filter){
//     return await messageModel.find({...filter, isActive: true})
// }
// async function readOne(filter){
//     return await messageModel.findOne({...filter, isActive: true})
// }
// async function update(id, data){
//     return await messageModel.findByIdAndUpdate(id, data, {new: true})
// }
// async function del(id){
//    return await update(id, {isActive: false})
// }
// async function delForEver(id){
//     return await messageModel.deleteOne(id)
// }


const messageModel = require('../models/message.model')

// CRUD
async function create(data) {
    return await messageModel.create(data)
}
async function read(filter) {
    return await messageModel.find({ ...filter, isActive: true })
}
async function readOne(filter) {
    return await messageModel.findOne({ ...filter, isActive: true })
}
async function update(id, data) {
    // return await messageModel.findOneAndUpdate({_id:id}, data,{new : true})
    return await messageModel.findByIdAndUpdate(id, data, { new: true })
}
async function del(id) {
    return await update(id, { isActive: false })
}

module.exports = { create, read, readOne, update, del }