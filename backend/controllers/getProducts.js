const {getProductsByPagenumber} =require("../database/rwProductData");
function getProducts(req,res)
{

    if(req.user.usertype!=='user')
    {
        res.status(401).json("Not a User");
        return;
    }

    getProductsByPagenumber(req.body.pagenumber,(err,productdata)=>{
        if(err)
        {
            res.status(500).json({error:err});
            return;
        }

        // console.log(productdata)
        res.status(200).json(productdata)

    })
    
}

module.exports=getProducts;