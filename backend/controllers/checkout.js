const {checkoutService}=require("../database/checkoutService");
function checkout(req,res)
{

    checkoutService(req.user.username,req.body.address,req.body.payment_id,(err,result)=>{
        if(err)
        {
            res.send(err);
            return;
        }
        
        res.send(result);

    })
}

module.exports=checkout;