const rwUserData=require("../database/rwUserData");
const getUserWithToken=rwUserData.getUserWithToken;
const updateEmailToken=rwUserData.updateEmailToken;
const setEmailVerified=rwUserData.setEmailVerified;

function verifyEmail(req,res)
{
    
    getUserWithToken(req.params.token,(err,userdata)=>{
        if(err)
        {
            res.send(err);
            return;
        }
        if(userdata==undefined)
        {
            res.send("<h1>Email is already verified or Wrong token<h1>");
            return;
        }

        setEmailVerified(userdata.username,(err,data)=>{
            if(err)
            {
                res.send(err);
                return;
            }

            updateEmailToken(userdata.username,(err,data)=>{
                if(err)
                {
                    res.send(err);
                    return;
                }
    
                res.send(`<h1>Email Verification Succesful for ${userdata.email}<h1>`);
            })

        })


    })


}


module.exports =verifyEmail;