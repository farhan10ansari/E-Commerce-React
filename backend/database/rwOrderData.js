const {client}=require("./init")

async function getUserOrders(username,callback)
{
    try{
        let userorders=await client.query(`select o.order_id,o.username,o.product_id,o.quantity,o.address,o.price,o.date,o.time,o.order_status,p.product_name,p.details,p.image,p.seller_username from orderdata o inner join productdata p on o.product_id=p.product_id where username='${username}' order by date desc,time desc,product_name asc;`);
        callback(null,userorders.rows);
    }
    catch(err)
    {
        callback(err,null);
    }
}

async function cancelProductOrder(username,product_id,order_id,callback)
{
    try{
        await client.query("BEGIN");
        let x=await client.query(`select quantity,order_status from orderdata where username='${username}' and product_id='${product_id}' and order_id='${order_id}'; `)
        if(x.rows[0].order_status=='cancelled')
        {
            callback("Product Already Cancelled",null);
            await client.query("ROLLBACK");
            return;
        }
        let quantity=parseInt(x.rows[0].quantity);
        await client.query(`update productdata set quantity=quantity+${quantity} where product_id='${product_id}';`);
        await client.query(`update orderdata set order_status='cancelled' where username='${username}' and product_id='${product_id}' and order_id='${order_id}';`)
        // console.log(quantity);
        await client.query("COMMIT");

        callback(null,"success")
    }
    catch(err)
    {
        console.log(err,null);
        await client.query("ROLLBACK");

    }
}

async function getSellerOrders(username,callback)
{
    // o.order_id,o.username,o.product_id,o.quantity,o.address,o.price,o.date,o.time,o.o
    try{
        let result=await client.query(`select o.*, u.name, u.phone, u.email,p.product_name,p.image,p.price originalprice,p.quantity totalquantity,p.details
                                        from orderdata o
                                        inner join userdata u on o.username = u.username
                                        inner join productdata p on o.product_id = p.product_id
                                        where o.seller_username = '${username}' order by date desc,time desc,product_name asc;`);
        callback(null,result.rows);

    }
    catch(error)
    {
        console.log(error);
        callback(err,null);

    }
}

module.exports={getUserOrders,cancelProductOrder,getSellerOrders}