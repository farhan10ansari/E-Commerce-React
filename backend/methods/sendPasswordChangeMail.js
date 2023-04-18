const sendMail=require("./sendMail");

function sendPasswordChangeMail(email,method)
{
    if(method=="change")
    {
        sendMail(email,"Password Changed","Your Password Changed Successfully","<h1>Password Change Successful</h1>");
    }
    else{
        sendMail(email,"Password Reset Successfull","Your Password Resetted Successfully","<h1>Password Reset Successful</h1>");

    }

}

module.exports=sendPasswordChangeMail;