
const {client}=require("./init")

let homepagesize=10;
let sellerpagesize=5;
let adminpagesize=5;

async function addProduct(username,usertype,data,file,callback)
{
            // console.log(data);
            // console.log(file);
    // console.log(data);
    if(usertype=='seller')
    {
        client.query(`insert into productdata(product_id,product_name,price,quantity,details,image,seller_username,isdeleted) values(
            '${'p'+Date.now()}',
            '${data.productname}',
             ${data.price},
             ${data.quantity},
            '${data.details}',
            '${file.filename}',
            '${username}',
            ${false}
            )`,(err,res)=>{
                if(err)
                {
                    callback(err,null);
                    console.log(err);
                    return;
                }
                    callback(null,res);
                })

    }
    else if(usertype='admin')
    {
        client.query(`select usertype from userdata where username='${data.seller_username}';`,(err,result)=>{
            if(result.rows.length>0 && result.rows[0].usertype=='seller')
            {
                client.query(`insert into productdata(product_id,product_name,price,quantity,details,image,seller_username,isdeleted) values(
                    '${'p'+Date.now()}',
                    '${data.productname}',
                     ${data.price},
                     ${data.quantity},
                    '${data.details}',
                    '${file.filename}',
                    '${data.seller_username}',
                    ${false}
                    )`,(err,res)=>{
                        if(err)
                        {
                            callback(err,null);
                            return;
                        }
                            callback(null,res);
                })

            }
            else{
                callback("Input username is not seller",null);
            }




        })


    }

    
   
}

// async function getAllProduct(callback)
// {
//     client.query(`select * from productdata where isdeleted=false`,(err,res)=>{
//         if(err)
//         {
//             callback(err,null);
//             return;
//         }
//         callback(null,res.rows);

//     })
   
// }

async function getSellerProductsByPagenumber(pagenumber,username,callback)
{
    let start=(pagenumber-1)*sellerpagesize;
    client.query(`select * from productdata where isdeleted=false and seller_username='${username}' order by product_id desc limit ${5} offset ${start};`,(err,res)=>{
        // console.log(err,res.rows);
        if(err)
        {
            callback(err,null);
            return;
        }
        callback(null,res.rows);

    })
   
}

async function getAdminProductsByPagenumber(pagenumber,username,callback)
{
    let start=(pagenumber-1)*adminpagesize;
    client.query(`select * from productdata where isdeleted=false order by product_id desc limit ${5} offset ${start};`,(err,res)=>{
        // console.log(err,res.rows);
        if(err)
        {
            callback(err,null);
            return;
        }
        callback(null,res.rows);

    })
   
}

async function getProductData(productId,callback)
{

    client.query(`select * from productdata where product_id='${productId}'`,(err,res)=>{
        if(err)
        {
            callback(err,null);
            return;
        }
        // console.log(res);
        callback(null,res.rows[0]);
    })
   
}

async function updateProductData(seller,data,file,callback)
{
    // console.log(data);
    // console.log(file);
    // console.log(seller);
    // return
    if(file)
    {
        client.query(`update productdata set product_name='${data.product_name}',price=${data.price},quantity=${data.quantity},details='${data.details}',image='${file.filename}' where product_id='${data.product_id}' and seller_username='${seller}';`,(err,res)=>{
            // console.log(err,res);
            if(err)
            {
                callback("error updating productdata",null);
                return;
            }
            

            getProductData(data.product_id,(err,productdata)=>{
                if(err)
                {
                    callback("error loading productdata",mull);
                    return;
                }

                callback(null,productdata);
            })
        })
        


    }
    else{
        client.query(`update productdata set product_name='${data.product_name}',price=${data.price},quantity=${data.quantity},details='${data.details}' where product_id='${data.product_id}' and seller_username='${seller}'`,(err,res)=>{
            if(err)
            {
                callback("error updating productdata",null);
                return;
            }
            getProductData(data.product_id,(err,productdata)=>{
                if(err)
                {
                    callback("error loading productdata",null);
                    return;
                }
                // console.log(res);
                callback(null,productdata);
            })
        })


    }
    


   
}

async function updateProductDataByAdmin(data,file,callback)
{
    console.log(data);
    console.log(file);
    // console.log(seller);
    if(file)
    {
        client.query(`update productdata set product_name='${data.product_name}',price=${data.price},quantity=${data.quantity},details='${data.details}',image='${file.filename}',seller_username='${data.seller_username}' where product_id='${data.product_id}';`,(err,res)=>{
            // console.log(err,res);
            if(err)
            {
                callback("error updating productdata",null);
                return;
            }
            

            getProductData(data.product_id,(err,productdata)=>{
                if(err)
                {
                    callback("error loading productdata",mull);
                    return;
                }

                callback(null,productdata);
            })
        })
        


    }
    else{
        client.query(`update productdata set product_name='${data.product_name}',price=${data.price},quantity=${data.quantity},details='${data.details}',seller_username='${data.seller_username}' where product_id='${data.product_id}';`,(err,res)=>{
            if(err)
            {
                callback("error updating productdata",null);
                return;
            }
            getProductData(data.product_id,(err,productdata)=>{
                if(err)
                {
                    callback("error loading productdata",null);
                    return;
                }
                // console.log(res);
                callback(null,productdata);
            })
        })


    }
    


   
}
async function deleteProductData(seller,usertype,productId,callback)
{
    // console.log("hello");
    if(usertype=='seller')
    {
        client.query(`update productdata set isdeleted=true where product_id='${productId}' and seller_username='${seller}'`,(err,res)=>{
            if(err)
            {
                callback(err,null);
                return;
            }
            // console.log(res);
            callback(null,res);
        })
    }
    else if(usertype='admin')
    {
        client.query(`update productdata set isdeleted=true where product_id='${productId}'`,(err,res)=>{
            if(err)
            {
                callback(err,null);
                return;
            }
            // console.log(res);
            callback(null,res);
        })


    }
   
}

async function getProductsByPagenumber(pagenumber,callback)
{
    let start=(pagenumber-1)*10;
    client.query(`select * from productdata where isdeleted=false order by product_id desc limit ${10} offset ${start}`,(err,res)=>{
        if(err)
        {
            callback(err,null);
            return;
        }
        // console.log(res);
        callback(null,res.rows);
    })
}

async function getPaginationInfoOfProduct(pagetype,username,callback)
{
    // console.log(pagetype);
    if(pagetype=='home')
    {
        client.query(`select count(*) as pagesize from productdata where isdeleted=false;`,(err,res)=>{
            if(err)
            {
                callback(err,null);
                return;
            }
            let page=Math.ceil(parseInt(res.rows[0].pagesize)/homepagesize);
            // console.log(page);
            callback(null,page);
        })

    }
    else if(pagetype=="sellerpage")
    {
        client.query(`select count(*) as pagesize from productdata where isdeleted=false and seller_username='${username}';`,(err,res)=>{
            if(err)
            {
                callback(err,null);
                return;
            }
    
            let page=Math.ceil(parseInt(res.rows[0].pagesize)/sellerpagesize);
            // console.log(res.rows[0].pagesize);
            callback(null,page);
        })
    }
    else if(pagetype=="adminpage")
    {   
        client.query(`select count(*) as pagesize from productdata where isdeleted=false;`,(err,res)=>{
            if(err)
            {
                callback(err,null);
                return;
            }
            let page=Math.ceil(parseInt(res.rows[0].pagesize)/adminpagesize);
            // console.log(page);
            callback(null,page);
        })

    }
    
}





module.exports = {addProduct,updateProductDataByAdmin,getSellerProductsByPagenumber,getAdminProductsByPagenumber,getProductData,updateProductData,deleteProductData,getProductsByPagenumber,getPaginationInfoOfProduct};