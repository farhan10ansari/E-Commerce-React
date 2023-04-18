const express=require("express");

const router=express.Router();

const multer=require("multer");
const upload = multer({dest: 'data/product_images/'});

const updateProduct=require("../controllers/updateProduct");
const checkAuthMiddle=require("../middlewares/checkAuthMiddle");

router.post("/",upload.single("file"),checkAuthMiddle,updateProduct);


module.exports = router;