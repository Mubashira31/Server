const jwt = require('jsonwebtoken')
const Student = require("../models/studentSchema");
const { configDotenv } = require('dotenv');

const   authenticate = async (req,res,next) => {
   try{
     const token = req.cookies.jwtoken;
     const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
     const rootStudent = await Student.findOne({_id:verifyToken._id,"tokens.token":token})
     if(!rootStudent){
        throw new Error('student not found')
     }
     req.token = token;
     req.rootStudent = rootStudent;
     req.studentID = rootStudent._id;
     next();
   }catch(err){
    res.status(401).send('unauthorized:no token provided')
        console.log(err)
   }
}

module.exports = authenticate
