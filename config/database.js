const mongoose = require('mongoose')

const conncetDB = function(){
    try{
        mongoose.connect(process.env.MONGODB_URI, {

        })
        console.log("connected mongodb...")
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = conncetDB