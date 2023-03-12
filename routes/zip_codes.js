const express = require("express");
const router = express.Router();
const con = require("../dbConfig");
const crypto = require('crypto');

router.get('/', (req, res)=>{
    var sql = `select * from zip_codes`;
    try{
        con.query(sql, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get zip_codes"})
                throw err;
            }
            else{
                console.log("get zip_codes successfull");
                let rows = [];
                for(let row of result[0]){
                    rows.push(JSON.parse(JSON.stringify(row)))
                }
                res.status(200);
                res.json(rows);
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500)
        res.json({error: "Cannot get zip_codes"})
    }
});


module.exports = router;