const rwUserData = require("../database/rwUserData");
const getUserWithToken = rwUserData.getUserWithToken;
const updateEmailToken = rwUserData.updateEmailToken;

const jwt = require('jsonwebtoken')
require('dotenv').config()

function verifyToken(req, res) {
    // console.log(req.body);

    getUserWithToken(req.body.token, (err, userdata) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        if (userdata == undefined) {
            res.staus(400).json("Wrong token");
            return;
        }

        // updateEmailToken(userdata.username, (err, result) => {
        //     if (err) {
        //         res.status(500).json(err);
        //         return;
        //     }

        // })




        let user = {
            name: userdata.name,
            username: userdata.username,
            usertype: userdata.usertype
        }

        const accessToken = jwt.sign({ username: userdata.username, usertype: userdata.usertype, email: userdata.email }, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({ accessToken, user });





    })

}

module.exports = verifyToken;