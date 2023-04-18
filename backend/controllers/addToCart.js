const {addUserCart}=require("../database/rwCartData");

function addToCart(req,res)
{
    // console.log(req.body);
    // console.log(req.user);
    // return;
    if(req.user.usertype!="user")
    {
        res.status(401).json("Not a User");
        return;
    } 
    

    addUserCart(req.user.username,req.body.productId,(err,message)=>{
        if(err)
        {
            res.status(500).json(err);
            return;
        }
        res.status(200).json("success");
        
    })
    
    
}

module.exports=addToCart;
