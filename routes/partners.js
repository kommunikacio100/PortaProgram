const express = require("express");
const router = express.Router();
const con = require("../dbConfig");
const crypto = require('crypto');

router.get('/', (req, res)=>{
    var sql = `select * from partners`;
    try{
        con.query(sql, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get partners"})
                throw err;
            }
            else{
                console.log("get partners successfull");
                let rows = [];
                for(let row of result){
                    rows.push(JSON.parse(JSON.stringify(row)))
                }
                res.status(200);
                res.json(rows);
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500)
        res.json({error: "Cannot get partners"})
    }
});


module.exports = router;