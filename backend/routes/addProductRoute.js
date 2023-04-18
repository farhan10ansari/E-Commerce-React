const express=require("express");
const router=express.Router();
const multer=require("multer");
const upload = multer({dest: 'data/product_images/'});


const {addProductPost}=require("../controllers/addProduct");
const checkAuthMiddle = require("../middlewares/checkAuthMiddle");



router.post("/",upload.single("file"),checkAuthMiddle,addProductPost);

module.exports = router;
 