const mongoose =require('mongoose')

const postSchema =mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    text:{
        type:String,
        required:true
    },
    name:{
        type:String,
    },
    avatar:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now()
    },
    likes:[
        {
            user: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    }
    ],
    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
        
        text:{
            type:String,
            required:true
        },
        name:{
            type:String,
        },
        avatar:{
            type:String,
        },
        date:{
            type:Date,
            default:Date.now
        },
    }
    ],
    date:{
        type:Date,
        default:Date.now
    }

})

module.exports=Post=mongoose.model('Post',postSchema)