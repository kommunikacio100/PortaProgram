const express = require("express");
const router = express.Router();
const con = require("../dbConfig");

router.get('/', (req, res)=>{
    var sql = `select * from scaleWeight LIMIT 1;`;
    try{
        con.query(sql, function (err, result) {
            if (err){
                res.status(500);
                res.json({error: "Cannot get weight"});
                throw err;
            }
            else{
                console.log( result);
                console.log("get weight successfull ", result[0].scaleWeight);
                res.status(200);
                res.json(result);
            }
        });
    }catch(e){
        console.error(e);
        res.status(500)
        res.error = "Cannot get weight";
    }
});

// use: PUT command http://127.0.0.1:3001/scaleWeight 
// a body egy json, ami tartalmazza a szükséges mezőket.
// PUT a mérleg adat módosítása
router.put('/', (req, res)=>{
//    CREATE DEFINER= 'root'@'localhost' FUNCTION 'scaleWeight'() RETURNS int(11)
    var sql = `DELETE FROM scaleWeight;
    INSERT INTO scaleWeight (scaleWeight) VALUES (?);`;
    //console.log( req.body);
    let scaleWeight = req.body.weight;
    try{
        con.query( sql, [scaleWeight], 
            function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot put the weight"})
                throw err;
            }
            else{
                console.log( `scaleWeight ${scaleWeight}`);
                res.status(200);
                result.status= "OK";
                res.json( result);
            }
        });
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot put weight", "scaleWeight": scaleWeight });
    }
});

var sql = `drop table if exists scaleWeight; create table scaleWeight (scaleWeight INT) ENGINE = MEMORY; insert into scaleWeight VALUES (0);`;
try{
    con.query( sql); 
    console.log( 'scaleWeight table created;');
}catch(e){
    console.error(e);
}

module.exports = router;