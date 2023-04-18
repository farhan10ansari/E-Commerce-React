
const rwUserData=require("../database/rwUserData");
const validatePassword=require("../methods/validatePassword");
const changePassword=rwUserData.changePassword;
const sendPasswordChangeMail=require("../methods/sendPasswordChangeMail");



function changePasswordPost(req,res)
{


    let errV=validatePassword(req.body.newPassword,req.body.confirmPassword);
    if(errV)
    {
        res.status(304).json(errV);
        return;
    }

    
    changePassword(req.user.username,req.body.newPassword,(err,data)=>{
        if(err)
        {
            res.status(500).json(err);
            console.log(err,"hi");
            return;
        }



        sendPasswordChangeMail(req.user.email,"change");
        res.status(200).json("success");

    })

    
    


}

module.exports = changePasswordPost;

   

