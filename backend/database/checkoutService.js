const {client}=require("./init")
const {getUserCart}=require("./rwCartData");

async function checkoutService(username,address,payment_id,callback)
{
    console.log(username,address,payment_id);
    // return;
    try{
        let res= await client.query(`select c.username,c.product_id,c.quantity,p.product_name,p.price,p.details,p.image,p.seller_username,p.quantity as available_quantity from cartdata c inner join productdata p on c.product_id=p.product_id where username='${username}' and p.isdeleted=false;`);
        let usercart=res.rows;
        // console.log(usercart);
        
        
            try{
                await client.query("BEGIN");
                let order_id='o'+Date.now();
                for(let i=0;i<usercart.length;i++)
                {
                    let p=usercart[i];
                    await client.query(`update productdata set quantity=quantity-${parseInt(p.quantity)} where product_id='${p.product_id}'`);
                    await client.query(`insert into orderdata(order_id,username,product_id,quantity,address,price,order_status,seller_username,payment_id) values (
                    '${order_id}',
                    '${p.username}',
                    '${p.product_id}',
                    ${p.quantity},
                    '${address}',
                     ${p.price},
                     'ordered',
                     '${p.seller_username}',
                     '${payment_id}'
                    )`);

                    await client.query(`delete from cartdata where product_id='${p.product_id}' and username='${p.username}'`);

                }

                await client.query("COMMIT");
                
                callback(null,"success");

                
                
            }
            catch(err)
            {
                console.log(err);
                await client.query("ROLLBACK");
                callback(err,null);

            }



    }
    catch(error)
    {
        callback(err,null);
    }


}

module.exports={checkoutService};