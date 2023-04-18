const {getUserCart}=require("../database/rwCartData");

function getTotalPrice(req,res)
{
    // console.log(req.body);
    // console.log(req.user);

    getUserCart(req.user.username,(err,cartdata)=>{
        if(err)
        {
            res.send({err});
            return;
        }

        // console.log(cartdata);
        let totalprice=0;
        for(let i=0;i<cartdata.length;i++)
        {
            totalprice+=parseInt(cartdata[i].quantity)*parseInt(cartdata[i].price);
        }
        // console.log(totalprice);
        res.send({totalprice});
    })

}




module.exports=getTotalPrice;