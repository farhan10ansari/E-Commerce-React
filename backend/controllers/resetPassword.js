const {getUserWithEmail} = require("../database/rwUserData");
const sendPasswordResetLink=require("../methods/sendPasswordResetLink");



 
function resetPassword(req,res)
{
    
    // console.log(req.body);
    // return;

    getUserWithEmail(req.body.email,(err,userdata)=>{
        // console.log(err,userdata);
        if(err)
        {
            res.send(err);
            return;
        }


        if(userdata==undefined)
        {
            res.send("No User Found With This Email");
            return;
        }

        sendPasswordResetLink(userdata);

        res.send("success");

    })
}

module.exports=resetPassword;