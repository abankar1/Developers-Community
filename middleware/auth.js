const jwt =require('jsonwebtoken')


module.exports =function(req,res,next){
    //get user token using header
    const token =req.header('auth-token')

    //check if token exists
    if(!token){
        return res.status(401).json({message:"Not Authorized,no token registered"})
    }

    //verify token
    try{
      const verifytoken = jwt.verify(token,'bumchick')
      req.user = verifytoken.user
      next()
    }
    catch(err){
        // console.log(err)
        res.status(401).json({message:"token not valid"})
    }
}