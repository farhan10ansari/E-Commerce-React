const jwt=require('jsonwebtoken');
require('dotenv').config()

function checkAuth(req,res)
{
    // console.log(req.body);

    jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET,(err,result)=>{
        if(err)
        {
            res.status(401).json("Invalid AccessToken");
            return;
        }
        
        // console.log(result);
        res.status(200).json("success");
    });
    // console.log(result);

}

module.exports=checkAuth;