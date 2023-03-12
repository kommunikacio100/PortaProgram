const express = require("express");
const router = express.Router();
const con = require("../dbConfig");
const crypto = require('crypto');

router.get('/', (req, res)=>{
    var sql = `select * from vehicles`;
    try{
        con.query(sql, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get vehicles"})
                throw err;
            }
            else{
                console.log("get vehicles successfull");
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
        res.json({error: "Cannot get vehicles"})
    }
});


module.exports = router;