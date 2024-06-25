const mongoose = require("mongoose")
// const bcrypt = require('bcryptjs')

const userschema = mongoose.Schema({
    firstname: { type: String, required:[true,"Firstname field is required"] },
    lastname: { type: String, required:[true,"lastname field is requried"] },
    email: { type: String, required:[true,"email field is requried"], unique:true},
    password: { type: String, required:[true,"password field is requried"] },
    profile: { type: String }
}, {timestamps:true})

// let saltround = 10
// userschema.pre('save', function(next){
//     console.log(this, 'banana');
//     bcrypt.hash(this.password, saltround, (hashpassword)=>{
//         console.log(hashpassword);
//     })
// })

const usermodel = mongoose.model("modularize_user", userschema)

module.exports = usermodel