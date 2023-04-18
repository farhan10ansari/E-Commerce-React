// console.clear();
const express = require("express");
const fs = require("fs");
const app = express();

require("dotenv").config();

const port = process.env.PORT;
app.set("view engine", "ejs");

const cors=require("cors");
app.use(cors());

//Database
const { initDb } = require("./database/init");
initDb();


//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("data/product_images"));
app.use(express.json());
const checkAuthMiddle = require("./middlewares/checkAuthMiddle");




//Not Logged In
const signupRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");
const verifyMail = require("./controllers/verifyMail");
const verifyToken=require("./controllers/verifyToken");
const resetPassword=require("./controllers/resetPassword");

//loggedin
const changePasswordRoute = require("./routes/changePasswordRoute");
const checkAuthRoute=require("./routes/checkAuthRoute");

//user
const getProductsRoute = require("./routes/getProductsRoute");
const addToCartRoute = require("./routes/addToCartRoute");
const getCartProductsRoute=require("./routes/getCartProductsRoute");

const plusButtonClicked = require("./controllers/plusButtonClicked");
const minusButtonClicked = require("./controllers/minusButtonClicked");
const deleteButtonClicked = require("./controllers/deleteButtonClicked");

const getTotalPrice=require("./controllers/getTotalPrice");
const checkout=require("./controllers/checkout");

const ordersUserRoute=require("./routes/ordersUserRoute");
const cancelOrderRoute=require("./routes/cancelOrderRoute");

const paymentRoute=require("./routes/paymentRoute");



//seller & admin
const addProductRoute = require("./routes/addProductRoute");

const updateProductRoute = require("./routes/updateProductRoute");
const deleteProductRoute = require("./routes/deleteProductRoute");

const ordersSellerRoute=require("./routes/ordersSellerRoute");

const getSellerProductsRoute=require("./routes/getSellerProductsRoute");
const getAdminProductsRoute=require("./routes/getAdminProductsRoute");




// const getPaginationInfo = require("./controllers/getPaginationInfo");
// app.use("/getPaginationInfo", getPaginationInfo);



//Not Logged in
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/verifyEmail/:token", verifyMail);
app.use("/verifyToken",verifyToken);
app.use("/resetPassword",resetPassword);

//loggedin
app.use("/changePassword", changePasswordRoute);
app.use("/checkAuth",checkAuthRoute);

//user
app.use("/getProducts", getProductsRoute);
app.use("/addToCart", addToCartRoute);
app.use("/getCartProducts",getCartProductsRoute);

app.use("/plusButtonClicked",checkAuthMiddle, plusButtonClicked);
app.use("/minusButtonClicked",checkAuthMiddle, minusButtonClicked);
app.use("/deleteButtonClicked",checkAuthMiddle, deleteButtonClicked);


app.use("/getTotalPrice",checkAuthMiddle,getTotalPrice);
app.use("/checkout",checkAuthMiddle,checkout);

app.use("/ordersUser",ordersUserRoute);
app.use("/cancelOrder",cancelOrderRoute);

app.use("/payment",paymentRoute);



//seller & admin
app.use("/addproduct", addProductRoute);

app.use("/updateProduct", updateProductRoute);
app.use("/deleteProduct", deleteProductRoute);

app.use("/ordersSeller",ordersSellerRoute);


app.use("/getSellerProducts",getSellerProductsRoute);
app.use("/getAdminProducts",getAdminProductsRoute);




app.get("/", (req, res) => {
    res.redirect("http://localhost:5173/");
})

app.get("*",(req,res)=>{
    res.status(404).send("<h1>404 Not Found<h1>");
})

app.listen(port, () => {
    console.log(`Server Listening at http://localhost:${port}`);
})
