const mongoose = require("mongoose")
const config =require('config')
const db= config.get('mongoAtlas')


const connect =async()=>{   
  try{
      await mongoose.connect(db,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false})
      console.log('db connected')
  }
   catch(err){
    console.log(err.message)
    process.exit(1)
   }
}

module.exports=connect