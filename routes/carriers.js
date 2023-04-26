const express = require("express");
const router = express.Router();
const con = require("../dbConfig");
const crypto = require('crypto');

// use: GET command with this link http://127.0.0.1:3001/carriers ahol az összes címet akarjuk visszakapni.
router.get('/', (req, res)=>{
    var sql = `select * from carriers`;
    try{
        con.query(sql, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get carrier"})
                throw err;
            }
            else{
                console.log("get carriers successfull");
                let rows = [];
                console.log( result);
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
        res.json({error: "Cannot get carriers"})
    }
});


// use: GET command with this link http://127.0.0.1:3001/carriers/2 ahol a 2-es carrier_id-jű címet akarjuk visszakapni.
router.get('/:carrier_id', (req, res)=>{
    var sql = `select * from carriers where id = ?`;
    let carrier_id = req.params.carrier_id;
    try{
        con.query(sql, carrier_id, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get carrier_id = "+ carrier_id})
                throw err;
            }
            else{
                if (result.length>0){
                    console.log("get carrier_id = "+ carrier_id +" successfull");

                    let rows = [];
                    console.log( result);
                    for(let row of result){
                        rows.push(JSON.parse(JSON.stringify(row)))
                    }
                    res.status(200);
                    res.json(rows);
                }else{
                    res.status(200);
                    res.json({"status":"No carrier", "text": "There is no carrier with this id = "+ carrier_id, "length":0});
                }
                
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get carrier_id = "+ carrier_id});
    }
})


// use: POST command http://127.0.0.1:3001/carriers 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy partnerhez több cím is tartozhat.
router.post('/', (req, res)=>{
    var sql = `insert into carriers (ekaer_id, name, memo, `+
        ` created_by) `+
        ` VALUES ( ?, ?, ?, ?);`;
    let carrier_ekaerid = req.body.carrier_ekaerid;
    let carrier_name = req.body.carrier_name;
    let carrier_memo = req.body.carrier_memo;
    let carrier_created_by = req.body.carrier_created_by;
    try{
        con.query(sql, [carrier_ekaerid, carrier_name, carrier_memo, 
            carrier_created_by], 
            function (err, result) {
                if (err){
                    res.status(500)
                    res.json({error: "Cannot post the new carrier"})
                    throw err;
                }
                else{
                    res.status(200);
                    console.log( "POST RESULT: ", result);
                    if (result.insertId>0){
                        console.log("post new carrier successfull. carrier_id: " + result.insertId );
                        res.json(result);
                    }else{
                        res.status(200);
                        res.json({"status":"error", "text": "The POST carrier is unsuccessfully", 
                        "carrier_name": carrier_name, 
                        "insertId": result.insertId});
                    }
                }
            }
        );
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get carriers with this parameters", "carrier_id": carrier_id, "length":0});
    }
})

// use: PUT command http://127.0.0.1:3001/carriers 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy partnerhez több cím is tartozhat.
// PUT az adat módosítása
router.put('/', (req, res)=>{
    var sql = `replace into carriers ( id, `+
    ` ekaer_id, name, memo, `+
    ` modified, modified_by) `+
    ` VALUES ( ?, ?, ?, ?, ?, ?);`;
    let carrier_id = req.body.carrier_id;
    let carrier_ekaerid = req.body.carrier_ekaerid;
    let carrier_name = req.body.carrier_name;
    let carrier_memo = req.body.carrier_memo;
    let carrier_modified = new Date().toISOString();
    let carrier_modified_by = req.body.carrier_modified_by;
    try{
        con.query(sql, [carrier_id, carrier_ekaerid, carrier_name, 
            carrier_memo, carrier_modified, carrier_modified_by], 
            function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot put the carrier"})
                throw err;
            }
            else{
                console.log( 'PUT RESULT', result);
                if (result.insertId>0){
                    console.log("put carrier successfull. carrier_id: " + result.insertId );
                    res.status(200);
                    result.status= "OK";
                    res.json( result);
                }else{
                    res.status(200);
                    result.status= "error";
                    result.errorText = "PUT insertId not found in result.";
                    result.carrier_id = carrier_id;
                    res.json(result);
                }
            }
        });
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot put carrier with id", "carrier_id": carrier_id });
    }
})

// use: DELETE command with this link http://127.0.0.1:3001/carriers/2 ahol a 2-es carrier_id-jű címet akarjuk törölni.
router.delete('/:carrier_id', (req, res)=>{
    var sql = `delete from carriers where id = ?`;
    let carrier_id = req.params.carrier_id;
    try{
        con.query( sql, carrier_id, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Can't delete carrier_id = "+ carrier_id})
                throw err;
            }
            else{
                res.status(200);
                if ( result.affectedRows>0){
                    console.log( "carrier_id = "+ carrier_id +" successfull deleted");
                    res.status(200);
                    result.status= "OK";
                    result.text_message = "carrier deleted.";
                    res.json(result);
                }else{
                    result.status= "error";
                    result.text_message = "carrier not deleted. affectedRows<1 in result.";
                    res.json(result);
                }
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get carrier_id = "+ carrier_id});
    }
})

module.exports = router;