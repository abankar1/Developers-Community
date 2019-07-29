const express =require('express')
const postsrouter =express.Router()
const {check,validationResult} =require("express-validator/check")
const auth =require("../../middleware/auth")
const User = require("../../models/User")
const Profile = require("../../models/Profile")
const Post = require("../../models/Post")

//Post requestto add post 
//Auth needed - accesed privately

postsrouter.post('/',[auth,check('text','Post cannot be Empty')],async (req,res)=>{
    const validationerrors = validationResult(req)
    if(!validationerrors.isEmpty()){
        req.statusCode(400).json({message:validationerrors.array()})
    }
    //GET user by his id
    try{
    const user = await User.findById(req.user.id).select('-password')
    
    //Create a New post object
    const  newPost = new Post({
        text:req.body.text,
        name:user.name,
        avatar:user.avatar,
        user:req.user.id
    })

    const post =await newPost.save()
    const profile = await Profile.findById(req.user.id)
    res.json(post)
}
catch(err){
    console.log(err)
    res.statusCode(500).send("Server error")
}
})

//GET Post
//Authentication needed --accesed privately
postsrouter.get('/',auth,async(req,res)=>{
    try{
   const allposts = await Post.find().sort({date:-1})
   res.json(allposts)
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({message:"Server error"})
    }
})

//GET Post by Id
//Authentication needed --accesed privately
postsrouter.get('/:post_id',auth,async(req,res)=>{
    try{
   const postbyid = await Post.findById(req.params.post_id)
   if(!postbyid){
       res.status(400).json({message:"No post found"})
   }
   res.json(allposts)
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({message:"Server error"})
    }
})

//DELETE Post
//Authentication needed -- accessed privately
postsrouter.delete('/:post_id',auth,async(req,res)=>{
    try{
   const postbyid = await Post.findById(req.params.post_id)
   if(postbyid.user.toString() !== req.user.id){
       res.status(401).json({message:"User not authorized"})
   }
   res.json(allposts)
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({message:"Server error"})
    }
})

//PUT Likes
//Authentication needed --accessed privately
postsrouter.put("/like/:post_id",auth,async(req,res)=>{
    try{
   const postbyid =await Post.findById(req.params.post_id)
 
   if(postbyid.likes.filter(like=>like.user== req.user.id).length>0){
       return res.status(400).send("Post allready liked")
   }
   postbyid.likes.unshift({user:req.user.id})
   await postbyid.save()
   res.json(postbyid.likes)
    }
    catch(err){
        console.error(err)
        res.status(500).send("server error")
    }
})

//PUT request to Unlike the post
//Authentication needed --accessed privately
postsrouter.put("/unlike/:post_id",auth,async(req,res)=>{
    try{
   const postbyid =await Post.findById(req.params.post_id)
 
   if(postbyid.likes.filter(like=>like.user== req.user.id).length===0){
       return res.status(400).send("Post has not been liked yet")
   }
   //get index of like and remove it
   const likeindex= postbyid.likes.map(like=>like.user).indexOf(req.user.id)
   postbyid.likes.splice(likeindex,1)
   await postbyid.save()
   res.json(postbyid.likes)
    }
    catch(err){
        console.error(err)
        res.status(500).send("server error")
    }
})

//Add Comment to Post using POST request
//Authentication needed- accesed privately
postsrouter.put('/comment/:id',[auth,check('text','Comment cannot be Empty')],async (req,res)=>{
    const validationerrors = validationResult(req)
    if(!validationerrors.isEmpty()){
        req.statusCode(400).json({message:validationerrors.array()})
    }
    //GET user and post by his id
    try{
    const user = await User.findById(req.user.id).select('-password')
    const post = await Post.findById(req.params.id)

    //Create a New Comment  object
    const  newComment = {
        text:req.body.text,
        name:user.name,
        avatar:user.avatar,
        user:req.user.id
    }
    
    //Add comment to post
    post.comments.unshift(newComment)
    
    await post.save()
    res.json(post.comments)
}
catch(err){
    console.log(err)
    res.statusCode(500).send("Server error")
}
})

//Delete Comment to Post using Delete request
//Authentication needed- accesed privately
postsrouter.delete('/comment/:post_id/:comment_id',[auth,check('text','Comment cannot be Empty')],async (req,res)=>{
    const validationerrors = validationResult(req)
    if(!validationerrors.isEmpty()){
        req.status(400).json({message:validationerrors.array()})
    }
    //GET post and comment by his id
    try{
    const postbyid = await Post.findById(req.params.post_id)
    //Get the comment
    const comment = await postbyid.comments.find(comment=>comment.id === req.params.comment_id)
    console.log(comment)
    //Check if comment exists
    if(!comment){
        res.status(404).json({message:"No comment found"})
    }
    
    if(comment.user.toString() !== req.user.id){
        return res.status(401).json({message:"User unauthorized"})
    }
    //Get remove index
    const commentindex= postbyid.comments.map(comment=>comment.id).indexOf(req.params.comment_id)
   postbyid.comments.splice(commentindex,1)
   await postbyid.save()
   res.json(postbyid.comments)
}
catch(err){
    console.log(err.message)
    res.status(500).send("Server error")
}
})
module.exports = postsrouter