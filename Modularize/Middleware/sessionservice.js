const jwt = require("jsonwebtoken")


const verify = async (token) =>{
   try {
    if(!token){
        throw new error({name: "Authentication error"})
        return
    }else{
        const decodetoken = await jwt.verify(token, "secret")
        const email = decodetoken.email
        return email
    }
   } catch (error) {
    console.log(error.message);
    if (error.name == "jwt expired") {
        throw new error({name: "Token expired"})
    }
   }
}

module.exports = {verify}