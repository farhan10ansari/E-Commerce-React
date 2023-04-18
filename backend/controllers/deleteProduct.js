const {deleteProductData}=require("../database/rwProductData");

function deleteProduct(req,res)
{


    if (req.user.usertype=='seller' || req.user.usertype=='admin')
    {
        deleteProductData(req.user.username,req.user.usertype,req.body.product_id,(err,result)=>{
            if(err)
            {
                res.status(500).json(err);
                return;
            }
    
            res.status(200).json("success");
        })
    }
    else{
        res.status(401).json("You Don't have permission");
    }



}

module.exports=deleteProduct;