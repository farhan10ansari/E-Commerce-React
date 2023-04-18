const express=require("express");
const { signupGet } = require("../controllers/signup");
const router=express.Router();

const {signupPost}=require("../controllers/signup");


router.post("/",signupPost)

module.exports = router;