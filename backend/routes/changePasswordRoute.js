const express=require("express");

const router=express.Router();

const changePasswordPost=require("../controllers/changePassword");



const checkAuthMiddle=require("../middlewares/checkAuthMiddle");





router.post("/",checkAuthMiddle,changePasswordPost);

module.exports = router;
