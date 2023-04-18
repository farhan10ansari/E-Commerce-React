const sendMail=require("./sendMail");

function sendEmailVerification(userdata)
{

    let tokenlink=`/verifyEmail/${userdata.emailtoken}`;
    sendMail(userdata.email,"Verify Your Email","Please Verify your email by clicking following link",`<a href="http://localhost:3333${tokenlink}">Verify Mail</a>`)
}


module.exports=sendEmailVerification;