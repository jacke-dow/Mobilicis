const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    income: String,
    city: String,
    car: String,
    quote: String,
    phone_price: String,

})

module.exports=mongoose.model("User",UserSchema)