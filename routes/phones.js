const express = require("express");
const router = express.Router();
const con = require("../dbConfig");
const crypto = require('crypto');

// use: GET command with this link http://127.0.0.1:3001/phones ahol az összes címet akarjuk visszakapni.
router.get('/', (req, res)=>{
    var sql = `select * from phones`;
    try{
        con.query(sql, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get phones"})
                throw err;
            }
            else{
                console.log("get phones successfull");
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
        res.json({error: "Cannot get phones"})
    }
});


// use: GET command with this link http://127.0.0.1:3001/phones/2 ahol a 2-es phone_id-jű címet akarjuk visszakapni.
router.get('/:phone_id', (req, res)=>{
    var sql = `select * from phones where phone_id = ?`;
    let phone_id = req.params.phone_id;
    try{
        con.query(sql, phone_id, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get phone_id = "+ phone_id})
                throw err;
            }
            else{
                if (result.length>0){
                    console.log("get phone_id = "+ phone_id +" successfull");

                    let rows = [];
                    console.log( result);
                    for(let row of result){
                        rows.push(JSON.parse(JSON.stringify(row)))
                    }
                    res.status(200);
                    res.json(rows);
                }else{
                    res.status(200);
                    res.json({"status":"No phone", "text": "There is no phone with this id = "+ phone_id, "length":0});
                }
                
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get phone_id = "+ phone_id});
    }
})


// use: GET command with this link http://127.0.0.1:3001/phones/P&/2&/true 
// ahol P a Partner táblát választja ki, és a 2-es partner_id-jű partnert, és csak a default címeket.
// Egy partnerhez több cím is tartozhat.
router.get('/:phone_to_table&/:phone_to_id&/:phone_default', (req, res)=>{
    var sql = `select * from phones where phone_to_table = ? and phone_to_id = ?`;
    let phone_to_table = req.params.phone_to_table;
    let phone_to_id = req.params.phone_to_id;
    let phone_default = req.params.phone_default;
    if (phone_default!=null) sql+= ` and phone_default = ` + phone_default;
    try{
        con.query(sql, [phone_to_table, phone_to_id, phone_default], function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get phone_to_table = "+ phone_to_table+ " addres_to_id: "+ phone_to_id})
                throw err;
            }
            else{
                if (result.length>0){
                    console.log("get phone successfull. phone_to_table = "+ phone_to_table+ " addres_to_id: "+ phone_to_id);

                    let rows = [];
                    console.log( result);
                    for(let row of result){
                        rows.push(JSON.parse(JSON.stringify(row)))
                    }
                    res.status(200);
                    res.json(rows);
                }else{
                    res.status(200);
                    res.json({"status":"No phone", "text": "There is no phone with this parameters", 
                    "phone_to_table": phone_to_table, 
                    "addres_to_id:": phone_to_id, 
                    "phone_default:": phone_default,
                    "length":0});
                }
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get phones with this parameters", "phone_to_table": phone_to_table, 
        "addres_to_id:": phone_to_id, "length":0});
    }
})


// use: GET command with this link http://127.0.0.1:3001/phones/P&/2 
// ahol P a Partner táblát választja ki, és a 2-es partner_id-jű partnert, mindegy hogy default vagy nem.
// Egy partnerhez több cím is tartozhat.
router.get('/:phone_to_table&/:phone_to_id', (req, res)=>{
    var sql = `select * from phones where phone_to_table = ? and phone_to_id = ?`;
    let phone_to_table = req.params.phone_to_table;
    let phone_to_id = req.params.phone_to_id;
    try{
        con.query(sql, [phone_to_table, phone_to_id], function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get phone_to_table = "+ phone_to_table+ " addres_to_id: "+ phone_to_id})
                throw err;
            }
            else{
                if (result.length>0){
                    console.log("get phone successfull. phone_to_table = "+ phone_to_table+ " addres_to_id: "+ phone_to_id);

                    let rows = [];
                    console.log( result);
                    for(let row of result){
                        rows.push(JSON.parse(JSON.stringify(row)))
                    }
                    res.status(200);
                    res.json(rows);
                }else{
                    res.status(200);
                    res.json({"status":"No phone", "text": "There is no phone with this parameters", 
                    "phone_to_table": phone_to_table, 
                    "addres_to_id:": phone_to_id, 
                    "length":0});
                }
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get phones with this parameters", "phone_to_table": phone_to_table, 
        "addres_to_id:": phone_to_id, "length":0});
    }
})

// use: POST command http://127.0.0.1:3001/phones 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy partnerhez több cím is tartozhat.
router.post('/', (req, res)=>{
    var sql = `insert into phones (phone_to_table, phone_to_id, `+
        ` phone, phone_memo, phone_default, `+
        ` phone_created_by) `+
        ` VALUES ( ?, ?, ?, ?, ?, ?);`;
    let phone_to_table = req.body.phone_to_table;
    let phone_to_id = req.body.phone_to_id;
    let phone = req.body.phone;
    let phone_memo = req.body.phone_memo;
    let phone_default = req.body.phone_default;
    let phone_created_by = req.body.phone_created_by;
    try{
        con.query(sql, [phone_to_table, phone_to_id, 
            phone, phone_memo,phone_default, phone_created_by], 
            function (err, result) {
                if (err){
                    res.status(500)
                    res.json({error: "Cannot post the new phone"})
                    throw err;
                }
                else{
                    res.status(200);
                    console.log( "POST RESULT: ", result);
                    if (result.insertId>0){
                        console.log("post new phone successfull. phone_id: " + result.insertId );
                        res.json(result);
                    }else{
                        res.status(200);
                        res.json({"status":"error", "text": "The POST phone is unsuccessfully", 
                        "phone_to_table": phone_to_table, 
                        "addres_to_id:": phone_to_id, 
                        "insertId": result.insertId});
                    }
                }
            }
        );
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get phones with this parameters", "phone_to_table": phone_to_table, 
        "phone_to_id:": phone_to_id, "length":0});
    }
})

// use: PUT command http://127.0.0.1:3001/phones 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy partnerhez több cím is tartozhat.
// PUT az adat módosítása
router.put('/', (req, res)=>{
    var sql = `replace into phones (phone_id, phone_to_table, phone_to_id, `+
    ` phone, phone_memo, phone_default, `+
    ` phone_modified, phone_modified_by) `+
        ` VALUES ( ?, ?, ?, ?, ?, ?, ?, ?);`;
    let phone_id = req.body.phone_id;
    let phone_to_table = req.body.phone_to_table;
    let phone_to_id = req.body.phone_to_id;
    let phone = req.body.phone;
    let phone_memo = req.body.phone_memo;
    let phone_default = req.body.phone_default;
    let phone_modified_by = req.body.phone_modified_by;
    let phone_modified = new Date().toISOString();
    try{
        con.query(sql, [phone_id, phone_to_table, phone_to_id, 
            phone, phone_memo, phone_default, phone_modified, phone_modified_by], 
            function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot put the phone"})
                throw err;
            }
            else{
                console.log( 'PUT RESULT', result);
                if (result.insertId>0){
                    console.log("put phone successfull. phone_id: " + result.insertId );
                    res.status(200);
                    result.status= "OK";
                    res.json( result);
                }else{
                    res.status(200);
                    result.status= "error";
                    result.errorText = "PUT insertId not found in result.";
                    result.phone_id = phone_id;
                    res.json(result);
                }
            }
        });
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot put phone with id", "phone_id": phone_id });
    }
})

// use: DELETE command with this link http://127.0.0.1:3001/phones/2 ahol a 2-es phone_id-jű címet akarjuk törölni.
router.delete('/:phone_id', (req, res)=>{
    var sql = `delete from phones where phone_id = ?`;
    let phone_id = req.params.phone_id;
    try{
        con.query( sql, phone_id, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Can't delete phone_id = "+ phone_id})
                throw err;
            }
            else{
                res.status(200);
                if ( result.affectedRows>0){
                    console.log( "phone_id = "+ phone_id +" successfull deleted");
                    res.status(200);
                    result.status= "OK";
                    result.text_message = "phone deleted.";
                    res.json(result);
                }else{
                    result.status= "error";
                    result.text_message = "phone not deleted. affectedRows<1 in result.";
                    res.json(result);
                }
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get phone_id = "+ phone_id});
    }
})


// use: DELETE command with this link http://127.0.0.1:3001/phones/P&/2 ahol a 2-es partner_id-hez tartozó összes címet akarjuk törölni.
router.delete('/:phone_to_table&/:phone_to_id', (req, res)=>{
    var sql = `delete from phones where phone_to_table = ? and phone_to_id = ?`;
    let phone_to_table = req.params.phone_to_table;
    let phone_to_id = req.params.phone_to_id;
    try{
        con.query( sql, [phone_to_table, phone_to_id], function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Can't delete phone_to_table = "+ phone_to_table+ ' phone_to_id = '+ phone_to_id})
                throw err;
            }
            else{
                res.status(200);
                if (result.affectedRows>0){
                    console.log( "phones successfull deleted for phone_to_table = "+ phone_to_table+ ' phone_to_id = '+ phone_to_id );
                    res.status(200);
                    result.status= "OK";
                    result.text_message = result.affectedRows+ " phones deleted.";
                    res.json(result);
                }else{
                    result.status= "error";
                    result.text_message = "delete unsuccessfully. affectedRows not found in the DELETE result.";
                    res.json(result);
                }
                
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get phone_id = "+ phone_id});
    }
})


module.exports = router;