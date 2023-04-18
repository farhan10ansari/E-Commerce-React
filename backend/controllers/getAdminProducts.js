const {getAdminProductsByPagenumber} =require("../database/rwProductData");
function getProducts(req,res)
{

    if(req.user.usertype!='admin')
    {
        res.staus(401).json("You don't have permission");
        return;
    }

    getAdminProductsByPagenumber(req.body.pagenumber,req.user.username,(err,productdata)=>{
        if(err)
        {
            res.status(500).json(err);
            return;
        }

        res.status(200).json(productdata)

    })
    
}

module.exports=getProducts;