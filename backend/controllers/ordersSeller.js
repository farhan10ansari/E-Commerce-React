const {getSellerOrders}=require("../database/rwOrderData");
function ordersSeller(req,res)
{
    // console.log(req.body);
    // console.log(req.user);

    if(req.user.usertype!='seller')
    {
        res.status(401).json("You Are Not A Seller");
        return;
    }

    // console.log(req.body);
    getSellerOrders(req.user.username,(err,sellerOrdersData)=>{
        if(err)
        {
            // console.log(err);
            res.status(500).json(err);
            return;
        }

        // console.log(sellerOrdersData);
        res.status(200).json(sellerOrdersData);

    })
    
}

module.exports=ordersSeller;