//import from module
const emailModel = require("../models/email.model")

//CRRUD
async function create(data){
    return await emailModel.create(data)
}
async function readOne(filter) {
    return await emailModel.findOne(filter)
}
async function read(filter,isPopulate) {
    return await emailModel.find(filter).populate(isPopulate ? 'msg' :'')
}
async function update(id, data){
    return await emailModel.findByIdAndUpdate(id, data, {new: true})
}
async function del(id){
   return await update(id, {isActive: false})
}
async function delForEver(id){
    return await emailModel.deleteOne(id)
}


// export crrudd
module.exports = { create, readOne, read, update, del, delForEver }