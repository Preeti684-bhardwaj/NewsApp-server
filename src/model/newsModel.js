const mongoose=require('mongoose')

const newsSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        // required:true
    },
    image:{
        type:String,
        // required:true
    },
    place:{
        type:String,
        required:true,
        default:'India'
    },
    time:{
        type:Date,
        default:Date.now()
    },
    category:{
        type:String
    },
    source:{
        type:String
    },
    url:{
        type:String
    }
})

module.exports=mongoose.model('news', newsSchema )