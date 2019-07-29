const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:String,
        required:true
    },
    company:{
        type:String
    },
    location:{
        type:String,
        required:true
    },
    website:{
        type:String
    },
    skills:{
        type:[String],
        required:true
    },
    bio:{
        type:String,
       
    },
    githubusername:{
        type:String,
        required:true
    },
    experience:[
        {
        title:{
            type:String,
            required:true
            },   
        companyname:{
            type:String,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        from:{
            type:Date,
            required:true
        },
        to:{
            type:Date,
        },
        current:{
            type:Boolean,
            default:false
        },
        description:{
            type:String,
        },
    }
    ],
    education:[
        {
        schoolname:{
            type:String,
            required:true
        },
        location:{
            type:String,
            
        },
        from:{
            type:Date,
            required:true
        },
        current:{
            type:Boolean,
            default:false
        },
        to:{
            type:Date,
        },
        degree:{
            type:String,
            required:true
        },
        major:{
            type:String,
            required:true
        },
    }
    ],
   social:{
        
        github:{
            type:String,
            required:true
        },
        LinkedIn:{
            type:String,
            required:true
        },
        Twitter:{
            type:String,
        },
        Instagram:{
            type:String,
        },
    
},
    

})

module.exports =Profile=mongoose.model('Profile',profileSchema)