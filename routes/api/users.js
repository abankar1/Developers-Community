const express =require('express')
const usersrouter =express.Router()
const {check,validationResult} = require("express-validator/check")
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt =require('bcryptjs')
const jwt =require('jsonwebtoken')

// usersrouter.get('/',(req,res)=>res.send('Users router'))
usersrouter.post('/',[check('name',"Name is required").not().isEmpty(),
check('email',"Email should be valid").isEmail(),
check('password',"Password should be atleast 6 characters").isLength({min:6})
],async (req,res)=>{
    //check for input validations
    console.log(req.name)
    const valid =validationResult(req)
    if(!valid.isEmpty()){
        return res.status(400).json({errors:valid.array()})
    }
    
    //get user details
    const {name,email,password} =req.body
    const avatar = gravatar.url(email,{
        s:'100',
        r:'pg',
        d:'mm'
    })
    try{
        //check if user is already exists
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        user =new User({
                name,
                avatar,
                password,
                email
            })

            const salt = await bcrypt.genSalt(10)
            //Encrypt password
            user.password = await bcrypt.hash(password,salt)
        
            //save User to database
            await user.save()
            // res.send(user.name+ "is"+"registered")
           
            //set payload to generate tokens
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

module.exports = usersrouter