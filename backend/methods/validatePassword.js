function validatePassword(newPassword,confirmPassword)
{

    return null;

    if(newPassword!=confirmPassword)
    {
        return "Passwords do not match";
    }

    if(newPassword.length<8)
    {
        return "Password Must contain 8 Atleast characters";
    }
    let ucase=false,lcase=false,num=false;
    for(let j=0;j<newPassword.length;j++)
    {
        if (!isNaN(newPassword[j] * 1))
        {
            num=true;
        }
        else if(newPassword[j].length === 1 && newPassword[j].match(/[a-z]/i))
        {
            if(newPassword[j]==newPassword[j].toUpperCase())
            {
                ucase=true;
            }
            else if(newPassword[j]==newPassword[j].toLowerCase())
            {
                lcase=true;
            }
        }
    }
    
    if(!lcase)
    {
        return "Passwords must contain atleast one lowercase letter";
    }
    if(!ucase)
    {
        return "Password must contain atleast one uppercase Letter";

    }
    if(!num)
    {
        return "Password must contain atleast one Number";

    }

    return null;

}

module.exports= validatePassword;