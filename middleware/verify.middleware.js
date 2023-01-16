const jwt= require('jsonwebtoken');

const authenticate= (req,res,next)=>{
    const token= req.headers.authorization;
    if(token){
      const decoded= jwt.verify(token, 'masai');

      if(decoded){
         next();
      }else{
        res.send("LogIn First");
      }
    }
    else{
      res.send("LogIn First")
    }
}

module.exports={authenticate};