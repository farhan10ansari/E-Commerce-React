const {cancelProductOrder}=require("../database/rwOrderData");



function cancelOrder(req,res)
{
    // console.log(req.body);
    if(req.user.usertype!=="user")
    {
        res.send("Not a User");
        return;
    }

    cancelProductOrder(req.user.username,req.body.product_id,req.body.order_id,(err,result)=>{
        if(err)
        {
            res.send(err);
            return;
        }
        
        res.send(result);
    })
}

module.exports=cancelOrder;