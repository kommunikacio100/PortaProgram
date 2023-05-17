const express = require("express");
const router = express.Router();
const con = require("../dbConfig");
const verifyToken = require('../verifyToken');
router.use( verifyToken);

router.get('/', (req, res)=>{
    var sql = `select * from movements`;
    try{
        con.query(sql, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get movements"})
                throw err;
            }
            else{
                console.log("get movements successfull");
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
        res.json({error: "Cannot get movements"})
    }
});


module.exports = router;