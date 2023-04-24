require('dotenv').config()
const express=require('express')
const app=express()
const mongoose=require('mongoose')

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("MongoDB Atlas Connected")).catch(()=> console.log("MongoDB Atlas Not Connected"))

app.use(express.json())

const usersRouter=require('./routes/users.js')
app.use('/users', usersRouter)

const port = process.env.PORT || 8000
app.listen(port, ()=> console.log(`http://localhost:${port}`))