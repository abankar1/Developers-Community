const express =require('express')
const authrouter =express.Router()
const auth = require('../../middleware/auth')
const User =require('../../models/User')
const bcrypt =require('bcryptjs')
const jwt =require('jsonwebtoken')
const {check,validationResult} = require("express-validator/check")


//get request (Return user details for given token)
authrouter.get('/',auth,async(req,res)=>{
    try{
        const user =await User.findById(req.user.id).select('-password')
        res.json(user)
    }
    catch(err){
        console.error(error)
        res.status(500).send('server error')
    }
})

//post request (Login to application)
authrouter.post('/',[
check('email',"Email should be valid").isEmail(),
check('password',"Password is required").exists()
],async (req,res)=>{
    //check for input validations
    const valid =validationResult(req)
    if(!valid.isEmpty()){
        return res.status(400).json({errors:valid.array()})
    }
    
    //get user details
    const {email,password} =req.body

    try{
        //check if user id entered
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid email/password"})
        }
        
        //check for password
        const passwordmatch = await bcrypt.compare(password,user.password)
        if(!passwordmatch){
            return res.status(400).json({message:"invalid email/password"})
        }
            const payload={
                user:{
                    id:user.id
                }
            }

        jwt.sign(payload,'bumchick',{
            expiresIn:36000
        },(err,token)=>{
            if(err) throw err
            res.send(token)
        })
    }
    catch(err){
    console.log(err)
    }
    
      
})

module.exports = authrouter