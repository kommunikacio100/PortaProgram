const express = require("express");
const router = express.Router();
const con = require("../dbConfig");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const SHA512 = require("crypto-js/sha512");
// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;
//console.log( 'process.env.TOKEN_SECRET ', process.env.TOKEN_SECRET);

function generateAccessToken(email) {
    return jwt.sign( email, process.env.TOKEN_SECRET);//, { expiresIn: '1h' });
  }


router.post('/', (req, res)=>{
    var sql = `select password_hash, name, id from users where email = ? `;
    let email = req.body.email;
    let password = req.body.password;
    try{
        con.query( sql, [ email] , 
            function (err, result) {
                if (err){
                    res.status(500)
                    res.json({error: "Cannot find user: "+ email})
                    throw err;
                }
                else{
                    res.status(200);
                    console.log( "POST RESULT[0]: ", result[0]);
                    console.log( "SHA512: ", SHA512( password).toString());
                    if (result[0].password_hash == SHA512( password).toString()){
                        console.log("login ok user ", email, ' ', result[0].id );
                        const jwt= generateAccessToken( email);
                        response = { jwt:jwt, data: result[0]};
                        console.log( response);
                        res.json(response);
                    }else{
                        res.status(200);
                        res.json({"status":"error", "text": "user not found "+ email});
                    }
                }
            }
        );
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "User not found. Server error."});
    }
})



module.exports = router;