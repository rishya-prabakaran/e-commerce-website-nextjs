import jwt from 'jsonwebtoken'

function Authenticated(icomponent){
    return (req,res)=>{
        const {authorization} = req.headers
        if(!authorization){
            return res.status(401).json({error:"Please login!"})
        }
        try{
              const {userId} = jwt.verify(authorization,process.env.JWT_SIGN) 
              req.userId = userId
              return icomponent(req,res)
        }catch(err){
            console.log(err)
            return res.status(401).json({error:"Please login!"})
        }
       
    }
}


export default Authenticated