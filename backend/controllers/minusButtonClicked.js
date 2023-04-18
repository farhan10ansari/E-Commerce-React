const {minusButtonCart}=require("../database/rwCartData");

function minusButtonClicked(req,res)
{
    if(req.user.usertype!='user')
    {
        res.send("Not a User");
        return;
    }


    minusButtonCart(req.user.username,req.body.productId,req.body.quantity,(err,result)=>{
        // console.log(err,data);
        if(err)
        {
            res.send(err);
            return;
        }


        res.send(result);
    })

}

module.exports=minusButtonClicked;