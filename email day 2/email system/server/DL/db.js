const  mongoose = require("mongoose")

async function connect (){
    try{
        mongoose.connect(process.env.MONGO_URI)
    }
    catch(err){
        console.log(err)
    }
}


const dbConnection = mongoose.connection;
dbConnection.once("open", ()=>{
    console.log("start connection");
})

module.exports = {
    connect
}