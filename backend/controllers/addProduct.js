const rwProductData=require("../database/rwProductData");
addProduct=rwProductData.addProduct;


function addProductPost(req,res){
    console.log(req.body)
    console.log(req.user)


    if(req.user.usertype=='seller' || req.user.usertype=='admin')
    {
        addProduct(req.user.username,req.user.usertype,req.body,req.file,(err,response)=>{
            if(err)
            {
                res.status(500).json(err);
                return;
            }
    
            res.status(200).json("Product Added Successfully");
        });

    }
    else{
        res.status(401).json("Not Authorized");
    }
    
   

}

module.exports ={addProductPost}