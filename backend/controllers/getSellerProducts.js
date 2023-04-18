const {getSellerProductsByPagenumber} =require("../database/rwProductData");
function getProducts(req,res)
{
    // console.log(req.body);
    // console.log(req.user);
    // return;
    getSellerProductsByPagenumber(req.body.pagenumber,req.user.username,(err,productdata)=>{
        if(err)
        {
            res.status(500).json({err:err});
            return;
        }

        res.status(200).json(productdata)

    })
    
}

module.exports=getProducts;