const rwUserData=require("../database/rwUserData");

const getUser=rwUserData.getUser;

const jwt=require('jsonwebtoken')
require('dotenv').config()


function loginPost(req,res)
{
    getUser(req.body.username,(err,userdata)=>{
        if(err)
        {
            res.status(500).json({error:err})
            return;
        }


        if(userdata==undefined)
        {
            res.status(400).json({error:"No User Found With This Username"});
            return;
        }



        if(!userdata.email_is_verified)
        {
            res.status(400).json({error:"Email Is Not Verified"});
            return;
        }

        if(userdata.password==req.body.password)
        {

            let user={
                name:userdata.name,
                username:userdata.username,
                usertype:userdata.usertype
            }

            const accessToken=jwt.sign({username:userdata.username,usertype:userdata.usertype,email:userdata.email},process.env.ACCESS_TOKEN_SECRET);
            res.status(200).json({accessToken,user});
            

        }
        else
        {
            res.status(401).json({error:"Wrong Password"});
        }
        
    })
    


}

module.exports = {loginPost};

   

