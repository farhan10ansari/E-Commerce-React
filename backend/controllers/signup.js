const rwUserData=require("../database/rwUserData");
const sendEmailVerification=require("../methods/sendEmailVerification");

const addUser=rwUserData.addUser;
const getUser=rwUserData.getUser;
const getUserWithEmail=rwUserData.getUserWithEmail;



function signupPost(req,res)
{

    getUser(req.body.username,(err,userdata)=>{
        if(err)
        {
            res.status(501).json({error:err});
            return;
        }

        if(userdata!=undefined)
        {
            res.status(400).json({error:"Username Already Exist"});
            return;
        }

        getUserWithEmail(req.body.email,(err,udata)=>{ 
            if(err)
            {
                res.status(501).json({error:err});
                return;
            }
            if(udata!=undefined) 
            {
                res.status(400).json({error:"Email Already Exist"});
                return;
            }


            addUser(req.body,(err,result)=>{
                if(err)
                {
                    res.status(500).json({error:err});
                    return;
                }

        
                sendEmailVerification(result);
                if(result.usertype=='seller')
                {
                    res.status(201).json({success:"Seller Account Created Successfully,Email Verification Link Sent"});

                }
                else{
                    res.status(201).json({success:"User SignUp Successfull,Email Verification Link Sent"});
                }
            });

            
        })


        
    });

    

   
}

module.exports = {signupPost};

   

