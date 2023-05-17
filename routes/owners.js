const express = require("express");
const router = express.Router();
const con = require("../dbConfig");
const verifyToken = require('../verifyToken');
router.use( verifyToken);

// use: GET command with this link http://127.0.0.1:3001/owners ahol az összes címet akarjuk visszakapni.
router.get('/', (req, res)=>{
    var sql = `select * from owners`;
    try{
        con.query(sql, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get owner"})
                throw err;
            }
            else{
                console.log("get owners successfull");
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
        res.json({error: "Cannot get owners"})
    }
});


// use: GET command with this link http://127.0.0.1:3001/owners/2 ahol a 2-es owner_id-jű címet akarjuk visszakapni.
router.get('/:owner_id', (req, res)=>{
    var sql = `select * from owners where id = ?`;
    let owner_id = req.params.owner_id;
    try{
        con.query(sql, owner_id, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get owner_id = "+ owner_id})
                throw err;
            }
            else{
                if (result.length>0){
                    console.log("get owner_id = "+ owner_id +" successfull");

                    let rows = [];
                    console.log( result);
                    for(let row of result){
                        rows.push(JSON.parse(JSON.stringify(row)))
                    }
                    res.status(200);
                    res.json(rows);
                }else{
                    res.status(200);
                    result.status = "owner not found";
                    result.text = "There is no owner with this id = "+ owner_id;
                    res.json( result);
                    console.log( JSON.stringify( result));
                }
                
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get owner_id = "+ owner_id});
    }
})


// use: POST command http://127.0.0.1:3001/owners 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy partnerhez több cím is tartozhat.
router.post('/', (req, res)=>{
    var sql = `insert into owners (vat_number, name, bank_account, memo, `+
        ` created_by) `+
        ` VALUES ( ?, ?, ?, ?, ?);`;
    let vat_number = req.body.vat_number;
    let name = req.body.name;
    let bank_account = req.body.bank_account;
    let memo = req.body.memo;
    let created_by = req.body.created_by;
    try{
        con.query(sql, [vat_number, name, bank_account, memo, 
            created_by], 
            function (err, result) {
                if (err){
                    res.status(500)
                    res.json({error: "Cannot post the new owner"})
                    throw err;
                }
                else{
                    res.status(200);
                    console.log( "POST RESULT: ", result);
                    if (result.insertId>0){
                        console.log("post new owner successfull. owner_id: " + result.insertId );
                        res.json(result);
                    }else{
                        res.status(200);
                        res.json({"status":"error", "text": "The POST owner is unsuccessfully", 
                        "owner_name": name, 
                        "insertId": result.insertId});
                    }
                }
            }
        );
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get owners with this parameters", "owner_id": owner_id, "length":0});
    }
})

// use: PUT command http://127.0.0.1:3001/owners 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy partnerhez több cím is tartozhat.
// PUT az adat módosítása
router.put('/', (req, res)=>{
    var sql = `replace into owners ( id, `+
    ` vat_number, name, bank_account, memo, `+
    ` modified, modified_by) `+
    ` VALUES ( ?, ?, ?, ?, ?, ?, ?);`;
    let id = req.body.id;
    let vat_number = req.body.vat_number;
    let name = req.body.name;
    let bank_account = req.body.bank_account;
    let memo = req.body.memo;
    let modified = new Date().toISOString();
    let modified_by = req.body.modified_by;
    try{
        con.query(sql, [id, vat_number, name, bank_account,
            memo, modified, modified_by], 
            function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot put the owner"})
                throw err;
            }
            else{
                console.log( 'PUT RESULT', result);
                if (result.insertId>0){
                    console.log("put owner successfull. id: " + result.insertId );
                    res.status(200);
                    result.status= "OK";
                    res.json( result);
                }else{
                    res.status(200);
                    result.status= "error";
                    result.errorText = "PUT insertId not found in result.";
                    result.id = id;
                    res.json(result);
                }
            }
        });
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot put owner with id", "id": id });
    }
});

// use: DELETE command with this link http://127.0.0.1:3001/owners/2 ahol a 2-es owner_id-jű címet akarjuk törölni.
router.delete('/:id', (req, res)=>{
    var sql = `delete from owners where id = ?`;
    let id = req.params.id;
    try{
        con.query( sql, id, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Can't delete owner id = "+ id})
                throw err;
            }
            else{
                res.status(200);
                if ( result.affectedRows>0){
                    console.log( "owner id = "+ id +" successfull deleted");
                    res.status(200);
                    result.status= "OK";
                    result.text_message = "owner deleted.";
                    res.json(result);
                }else{
                    result.status= "error";
                    result.text_message = "owner not deleted. affectedRows<1 in result.";
                    res.json(result);
                }
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get owner id = "+ id});
    }
})



module.exports = router;