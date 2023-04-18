const {plusButtonCart}=require("../database/rwCartData");

function plusButtonClicked(req,res)
{


    if(req.user.usertype!='user')
    {
        res.send("Not a User");
        return;
    }


    plusButtonCart(req.user.username,req.body.productId,req.body.quantity,(err,result)=>{
        if(err)
        {
            res.send(err);
            return;
        }
        res.send(result);
        
    })
}

module.exports=plusButtonClicked;