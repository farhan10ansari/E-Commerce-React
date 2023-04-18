const {client}=require("./init")
const {getProductData}=require("./rwProductData");

async function getUserCart(username,callback)
{

    client.query(`select c.username,c.product_id,c.quantity,p.product_name,p.price,p.details,p.image,p.seller_username,p.quantity as available_quantity from cartdata c inner join productdata p on c.product_id=p.product_id where username='${username}' and p.isdeleted=false order by product_id desc;`,(err,response)=>{
        if(err)
        {
            callback(err,null);
            return;
        }
        callback(null,response.rows);

    })
   
}



async function addUserCart(username,productId,callback)
{
    getProductData(productId,(err,productdata)=>{
        if(err)
        {
            callback(err,null);
            return;
        }

        productdata.quantity=parseInt(productdata.quantity);

        // console.log(productdata);
        // return

        client.query(`select * from cartdata where username='${username}' and product_id='${productId}'`,(err,productcart)=>{
            if(err)
            {
                callback(err,null);
                return;
            }

            if(productcart.rows.length==0 && productdata.quantity>0)
            {
                client.query(`insert into cartdata(username,product_id,quantity) values('${username}','${productId}',${1})`,(err,response)=>{
                    if(err)
                    {
                        callback(err,null);
                        return;
                    }
    
                    callback(null,response);
    
    
                })
    
            }
            else if(productcart.rows.length>0 && productdata.quantity>productcart.rows[0].quantity){
                let quantity=productcart.rows[0].quantity;
                // console.log(res.rows[0]);
    
                client.query(`update cartdata set quantity=${++quantity} where username='${username}' and product_id='${productId}'`,(err,response)=>{
                    if(err)
                    {
                        callback(err,null);
                        return;
                    }
    
                    callback(null,response);
                })
            }
            else{
                callback("Item Out Of Stock",null);

            }
    
        })




    })


    

   
}

async function minusButtonCart(username,productId,quantity,callback)
{
    getProductData(productId,(err,productdata)=>{
        if(err)
        {
            callback({err},null);
            return;
        }
        quantity--;
        let totalquantity=parseInt(productdata.quantity);
        if(totalquantity<=0)
        {
            quantity=0;
        }
        else if(quantity<=0 && 1<=totalquantity){
            quantity=1;

        }
        else if(totalquantity<quantity)
        {
            quantity=totalquantity;
        }



        client.query(`update cartdata set quantity=${quantity} where username='${username}' and product_id='${productId}'`,(err,response)=>{
            if(err)
            {
                callback({err},null);
                return;
            }

            callback(null,{quantity,totalquantity});

        })   


    })
}

async function plusButtonCart(username,productId,quantity,callback)
{

    getProductData(productId,(err,productdata)=>{
        if(err)
        {
            callback({err},null);
            return;
        }


        quantity++;
        let totalquantity=parseInt(productdata.quantity);
        if(totalquantity<quantity)
        {
            quantity=totalquantity;
        }


    

        client.query(`update cartdata set quantity=${quantity} where username='${username}' and product_id='${productId}'`,(err,response)=>{
            if(err)
            {
                callback({err},null);
                return;
            }

            callback(null,{quantity,totalquantity});


        })   
    })
}

async function deleteButtonCart(username,productId,callback)
{
    client.query(`delete from cartdata where username='${username}' and product_id='${productId}'`,(err,response)=>{
        if(err)
        {
            callback(err,null);
            return;
        }

        callback(null,response);


    })

   
}






module.exports={addUserCart,getUserCart,minusButtonCart,deleteButtonCart,plusButtonCart};