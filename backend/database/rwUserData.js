// const userDataModel=require("./Models/userDataModel");
const {client}=require("./init")

async function addUser(data,callback)
{
    let usertype='user';
    if(data.usertype=='seller')
    {
        usertype='seller';
    }

    client.query(`insert into userdata(username,name,password,email,email_is_verified,emailtoken,phone,usertype) values(
    '${data.username}',
    '${data.name}',
    '${data.password}',
    '${data.email}',
    ${false},
    ${Date.now()},
    ${data.phone},
    '${usertype}'
    )`,(err,res)=>{
        if(err)
        {
            callback(err,null);
            return;
        }

        client.query(`select * from userdata where username='${data.username}'`,(err,res)=>{
            if(err)
            {
                callback(err,null);
                return;
            }
            callback(null,res.rows[0]);
        })

    });
   
}
async function getUser(username,callback)
{

    client.query(`select * from userdata where username='${username}'`,(err,res)=>{
        if(err)
        {
            callback(err,null);
            return;
        }
        callback(null,res.rows[0]);
    })

}

async function getUserWithEmail(email,callback)
{

    client.query(`select * from userdata where email='${email}'`,(err,res)=>{
        if(err)
        {
            callback(err,null);
            return;
        }
        callback(null,res.rows[0]);
    })


}

async function changePassword(username,newPassword,callback)
{



    client.query(`update userdata set password='${newPassword}'  where username='${username}'`,(err,res)=>{
        if(err)
        {
            callback(err,null);
            return;
        }
        callback(null,res);
    })
}

async function getUserWithToken(token,callback)
{

    client.query(`select * from userdata where emailtoken=${token}`,(err,res)=>{
        if(err)
        {
            callback(err,null);
            return;
        }
        callback(null,res.rows[0]);
    })

}

async function updateEmailToken(username,callback)
{
    client.query(`update userdata set emailtoken=${Date.now()}  where username='${username}'`,(err,res)=>{
        if(err)
        {
            callback(err,null);
            return;
        }
        callback(null,res);
    })

}

async function setEmailVerified(username,callback)
{

    client.query(`update userdata set email_is_verified=true  where username='${username}'`,(err,res)=>{
        if(err)
        {
            callback(err,null);
            return;
        }
        callback(null,res);
    })

}



module.exports = {addUser,getUser,changePassword,getUserWithToken,updateEmailToken,setEmailVerified,getUserWithEmail};