//import from module
const userModel = require("../models/user.model")

//CRRUD
async function create(data) {
    return await userModel.create(data)
}
async function read(filter) {
    console.log(filter);
    return await userModel.find({ ...filter, isActive: true })
}
async function readOne(filter, populate={}) {
    let data = await userModel.findOne({ ...filter, isActive: true })
    // if(populate.chats) data=await data.populate('chats.chat')
    // if(populate.users) data=await data.populate('chats.chat.members')
    return data//.toObject()
}

async function update(id, data) {
    // return await userModel.findOneAndUpdate({_id:id}, data,{new : true})
    return await userModel.findByIdAndUpdate(id, data, { new: true })
}
async function del(id) {
    return await update(id, { isActive: false })
}
async function save(user) {
    return await user.save()
}
async function readByFlags(id, flags = [], populate = {}) {
    let data = await userModel.findOne({ _id: id, isActive: true })
    data.chats = data.chats.filter(c => flags.every(f => {
        if (typeof f === 'object') {
            let [[k, v]] = Object.entries(f)
            return c[k] == v
        }
        return c[f]
    }))
    if (populate.chats) data = await data.populate('chats.chat')
    if (populate.users) data = await data.populate({ path: 'chats.chat.members', select: "fullName avatar" })
    
    return data.toObject()
}


const userController = { create, read, readOne, update, del, save, readByFlags }
module.exports = userController
// async function create(data){
//     return await userModel.create(data)
// }
// async function read(filter){
//     return await userModel.find({...filter, isActive: true})
// }
// async function readOne(filter, isPopulate){
//     return await userModel.findOne({...filter, isActive: true})
//     .populate(isPopulate ? 'emails.email' :'')
// }

// // return await userModel.findOne({...filter, isActive: true}).populate(isPopulate?{
// //     path: 'emails.email',
// //         populate: {
// //             path: 'msg'
// //         }
// //     }
// // :"");


// // }
// async function update(id, data){
//     return await userModel.findByIdAndUpdate(id, data, {new: true})
// }
// async function del(id){
//    return await update(id, {isActive: false})
// }
// async function delForEver(id){
//     return await userModel.deleteOne(id)
// }


// export crrudd