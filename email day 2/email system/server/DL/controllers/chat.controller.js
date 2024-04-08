


const chatModel = require('../models/chat.model')

//CRRUD
async function create(data) {
    return await chatModel.create(data)
}
async function read(filter,isPopulate) {
    return await chatModel.find(filter).populate(isPopulate ? 'msg' :'')
}
async function readOne(filter) {
    return await chatModel.findOne(filter)
}
async function update(id, data) {
    // return await chatModel.findOneAndUpdate({_id:id}, data,{new : true})
    return await chatModel.findByIdAndUpdate(id, data, { new: true })
}
async function del(id) {
    return await update(id, { isActive: false })
}

async function delForEver(id){
    return await chatModel.deleteOne(id)
}


module.exports = { create, read, readOne, update, del, delForEver }







// async function create(data){
//     return await emailModel.create(data)
// }
// async function readOne(filter,isPopulate) {
//     return await emailModel.findOne(filter).populate(isPopulate ? 'msg' :'')
// }
// async function read(filter,isPopulate) {
//     return await emailModel.find(filter).populate(isPopulate ? 'msg' :'')
// }
// async function update(id, data){
//     return await emailModel.findByIdAndUpdate(id, data, {new: true})
// }
// async function del(id){
//    return await update(id, {isActive: false})
// }
// async function delForEver(id){
//     return await emailModel.deleteOne(id)
// }


// // export crrudd
// module.exports = { create, readOne, read, update, del, delForEver }