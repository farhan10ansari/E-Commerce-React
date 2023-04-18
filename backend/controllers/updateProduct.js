const {updateProductData}=require("../database/rwProductData");
const {updateProductDataByAdmin}=require("../database/rwProductData");


function updateProduct(req,res)
{

    // console.log(req.body);
    // console.log(req.file);
    // console.log(req.user);


    if(req.user.usertype=='seller')
    {
        updateProductData(req.user.username,req.body,req.file,(error,result)=>{
            if(error)
            {
                res.status(500).json(error);
                return;
            }
            
            res.status(200).json(result);
    
        })
        return;
    }

    
    if(req.user.usertype=='admin')
    {
        updateProductDataByAdmin(req.body,req.file,(error,result)=>{
            if(error)
            {
                res.status(500).json(error);
                return;
            }
    
            res.status(200).json(result);
    
        })
        return;
    }

    res.staus(400).json("Unauthorized");


    

}

module.exports = updateProduct;