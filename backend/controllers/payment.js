const Razorpay=require("razorpay");




async function payment(req,res)
{
    // console.log(req.body);

    let {amount}=req.body;

    var instance = new Razorpay({ key_id: 'rzp_test_95nWLgZitJP9t9', key_secret: 'wuNWi0EjggJzmgdOWPmRu2pG' });

    let order=await instance.orders.create({
    amount: amount*100,
    currency: "INR",
    receipt: "receipt#1"
  
    });

    res.status(201).json({
        success:true,
        order,
        amount
    });

}

module.exports=payment;



// notes: {
//     key1: "value3",
//     key2: "value2"
// }