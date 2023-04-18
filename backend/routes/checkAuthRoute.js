const express=require("express");

const router=express.Router();


const checkAuth = require("../controllers/checkAuth");


router.post("/",checkAuth);

module.exports = router;
