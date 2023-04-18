const {getUserOrders}=require("../database/rwOrderData");

function ordersUser(req,res)
{
    // console.log(req.body);
    // console.log(req.user);
    if(req.user.usertype!="user")
    {
        res.status(401).json("You are Not a User.Login With User Account");
        return;
    }
    getUserOrders(req.user.username,(err,userorders)=>{
        if(err)
        {
            res.status(500).json(err);
            return;
        }
        // console.log(userorders);
        res.status(200).json(userorders);
    })
}
module.exports=ordersUser;