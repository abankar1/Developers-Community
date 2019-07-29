const express =require("express")
const app =express()
const dbconnection =require('./config/connect')

//Db connection
dbconnection()

app.use(express.json({extended:false}))

//main app
app.get("/",(req,res)=>res.send("EXPRESS IS RUNNING"))


//Api Routes
app.use("/auth",require("./routes/api/auth"))
app.use("/profile",require("./routes/api/profile"))
app.use("/post",require("./routes/api/posts"))
app.use("/users",require("./routes/api/users"))


const PORT =process.env.PORT||4000

app.listen(PORT,()=>{
    console.log("SERVER is listening")
})