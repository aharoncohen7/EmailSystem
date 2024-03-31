const { create, read, readOne, update, del } =
    require('../DL/controllers/message.controller')


    async function getAllmessages() {
        let messages = await read({})
        return messages
    }


    module.exports = {
      getAllmessages
    }