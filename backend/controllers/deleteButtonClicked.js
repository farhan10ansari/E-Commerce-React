const {deleteButtonCart}=require("../database/rwCartData");

function deleteButtonClicked(req,res)
{


    if(req.user.usertype!='user')
    {
        res.send("Not a User");
        return;
    }

    deleteButtonCart(req.user.username,req.body.productId,(err,data)=>{
        if(err)
        {
            res.send(err);
            return;
        }


        res.send("success");
    })

}

module.exports=deleteButtonClicked;