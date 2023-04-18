const sendMail=require("./sendMail");

require("dotenv").config();

function sendPasswordResetLink(userdata)
{

    tokenlink=`/resetPW/${userdata.emailtoken}`;
    sendMail(userdata.email,"Password Reset Link","Reset Your Password by clicking the following link",`<a href="${process.env.FRONTEND_URL+tokenlink}">Reset Password</a>`)
}


module.exports=sendPasswordResetLink;