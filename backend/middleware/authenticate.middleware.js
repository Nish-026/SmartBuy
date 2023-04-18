const jwt=require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    console.log(token)
    if(token){
        jwt.verify(token, 'shhhhh', function(err, decoded) {
            console.log(decoded)
            if(decoded){
                console.log(req.body)
                req.body.userID=decoded.userID
                next()
            }else{
                res.send({"msg":"Please Login"})
            }
          });
    }else{
        res.send({"msg":"something went wrong"})
    }
}

module.exports={
    authenticate
}