const {getUserCart}=require("../database/rwCartData");

function getcartproducts(req,res)
{
    // console.log(req.body);
    // console.log(req.user);

    if(req.user.usertype!='user')
    {
        res.status(400).json("You are not User");
        return;
    }


    getUserCart(req.user.username,(err,usercart)=>{
        if(err)
        {
            res.status(500).json(err);
            return;
        }
        // console.log(usercart);

        res.status(200).json(usercart);

    })
}

module.exports=getcartproducts;