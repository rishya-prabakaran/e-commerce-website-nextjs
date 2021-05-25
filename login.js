import initDB from '../../helpers/initDB'
import User from '../../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

initDB()

export default async (req,res)=>{
     const {email,password} = req.body
     try{
        if(!email || !password){
          return res.status(422).json({error:"Please fill all the fields!"})
        }
      const user = await User.findOne({email})
      if(!user){
          return res.status(404).json({error:"User with the specified email does not exist!"})
      }
        const doMatch =  await bcrypt.compare(password,user.password)
        if(doMatch){
           const token =  jwt.sign({userId:user._id},process.env.JWT_SIGN,{
                expiresIn:"7d"
            })
            const {name,role,email} = user
            res.status(201).json({message:"Login Success!",token,user:{name,role,email}})
        }else{
           return res.status(401).json({error:"Email/Password is incorrect!"})
        }
     }catch(err){
         console.log(err)
     }
}