//import from module
const userModel = require("../models/user.model")

//CRRUD
async function create(data){
    return await userModel.create(data)
}
async function read(filter){
    return await userModel.find({...filter, isActive: true})
}
async function readOne(filter, isPopulate){
    return await userModel.findOne({...filter, isActive: true})
    .populate(isPopulate ? 'emails.email' :'')
}
async function update(id, data){
    return await userModel.findByIdAndUpdate(id, data, {new: true})
}
async function del(id){
   return await update(id, {isActive: false})
}
async function delForEver(id){
    return await userModel.deleteOne(id)
}


// export crrudd
module.exports = { create, readOne, read, update, del, delForEver }