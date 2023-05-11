const express = require("express");
const router = express.Router();
const con = require("../dbConfig");

router.get('/', (req, res)=>{
    var sql = `create wiew if not exists scaleWeight select 'not defined'; select * from scaleWeight;`;
    try{
        con.query(sql, function (err, result) {
            if (err){
                res.status(500);
                res.json({error: "Cannot get weight"});
                throw err;
            }
            else{
                console.log("get weight successfull");
                let rows = [];
                console.log( result);
                for(let row of result){
                    rows.push( JSON.parse( JSON.stringify(row)));
                }
                res.status(200);
                res.json(rows);
            }
        });
    }catch(e){
        console.error(e);
        res.status(500)
        res.error = "Cannot get weight";
    }
});

module.exports = router;