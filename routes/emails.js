const express = require("express");
const router = express.Router();
const con = require("../dbConfig");
const crypto = require('crypto');

// use: GET command with this link http://127.0.0.1:3001/emails ahol az összes címet akarjuk visszakapni.
router.get('/', (req, res)=>{
    var sql = `select * from emails`;
    try{
        con.query(sql, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get adresses"})
                throw err;
            }
            else{
                console.log("get emails successfull");
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
        res.json({error: "Cannot get emails"})
    }
});


// use: GET command with this link http://127.0.0.1:3001/emails/2 ahol a 2-es email_id-jű címet akarjuk visszakapni.
router.get('/:email_id', (req, res)=>{
    var sql = `select * from emails where email_id = ?`;
    let email_id = req.params.email_id;
    try{
        con.query(sql, email_id, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get email_id = "+ email_id})
                throw err;
            }
            else{
                if (result.length>0){
                    console.log("get email_id = "+ email_id +" successfull");

                    let rows = [];
                    console.log( result);
                    for(let row of result){
                        rows.push(JSON.parse(JSON.stringify(row)))
                    }
                    res.status(200);
                    res.json(rows);
                }else{
                    res.status(200);
                    res.json({"status":"No email", "text": "There is no email with this id = "+ email_id, "length":0});
                }
                
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get email_id = "+ email_id});
    }
})


// use: GET command with this link http://127.0.0.1:3001/emails/P&/2&/true 
// ahol P a Partner táblát választja ki, és a 2-es partner_id-jű partnert, és csak a default címeket.
// Egy partnerhez több cím is tartozhat.
router.get('/:email_to_table&/:email_to_id&/:email_default', (req, res)=>{
    var sql = `select * from emails where email_to_table = ? and email_to_id = ?`;
    let email_to_table = req.params.email_to_table;
    let email_to_id = req.params.email_to_id;
    let email_default = req.params.email_default;
    if (email_default!=null) sql+= ` and email_default = ` + email_default;
    try{
        con.query(sql, [email_to_table, email_to_id, email_default], function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get email_to_table = "+ email_to_table+ " addres_to_id: "+ email_to_id})
                throw err;
            }
            else{
                if (result.length>0){
                    console.log("get email successfull. email_to_table = "+ email_to_table+ " addres_to_id: "+ email_to_id);

                    let rows = [];
                    console.log( result);
                    for(let row of result){
                        rows.push(JSON.parse(JSON.stringify(row)))
                    }
                    res.status(200);
                    res.json(rows);
                }else{
                    res.status(200);
                    res.json({"status":"No email", "text": "There is no email with this parameters", 
                    "email_to_table": email_to_table, 
                    "email_to_id:": email_to_id, 
                    "email_default:": email_default,
                    "length":0});
                }
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get emails with this parameters", "email_to_table": email_to_table, 
        "email_to_id:": email_to_id, "length":0});
    }
})


// use: GET command with this link http://127.0.0.1:3001/emails/P&/2 
// ahol P a Partner táblát választja ki, és a 2-es partner_id-jű partnert, mindegy hogy default vagy nem.
// Egy partnerhez több cím is tartozhat.
router.get('/:email_to_table&/:email_to_id', (req, res)=>{
    var sql = `select * from emails where email_to_table = ? and email_to_id = ?`;
    let email_to_table = req.params.email_to_table;
    let email_to_id = req.params.email_to_id;
    try{
        con.query(sql, [email_to_table, email_to_id], function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get email_to_table = "+ email_to_table+ " addres_to_id: "+ email_to_id})
                throw err;
            }
            else{
                if (result.length>0){
                    console.log("get email successfull. email_to_table = "+ email_to_table+ " addres_to_id: "+ email_to_id);

                    let rows = [];
                    console.log( result);
                    for(let row of result){
                        rows.push(JSON.parse(JSON.stringify(row)))
                    }
                    res.status(200);
                    res.json(rows);
                }else{
                    res.status(200);
                    res.json({"status":"No email", "text": "There is no email with this parameters", 
                    "email_to_table": email_to_table, 
                    "addres_to_id:": email_to_id, 
                    "length":0});
                }
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get emails with this parameters", "email_to_table": email_to_table, 
        "addres_to_id:": email_to_id, "length":0});
    }
})

// use: POST command http://127.0.0.1:3001/emails 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy partnerhez több cím is tartozhat.
router.post('/', (req, res)=>{
    var sql = `insert into emails (email_to_table, email_to_id, `
        ` email, email_memo, email_default, `+
        ` email_created_by) `+
        ` VALUES ( ?, ?, ?, ?, ?, ?);`;
    let email_to_table = req.body.email_to_table;
    let email_to_id = req.body.email_to_id;
    let email = req.body.email;
    let email_memo = req.body.email_memo;
    let email_default = req.body.email_default;
    let email_created_by = req.body.email_created_by;
    try{
        con.query(sql, [email_to_table, email_to_id, 
            email, email_memo, email_default, email_created_by], 
            function (err, result) {
                if (err){
                    res.status(500)
                    res.json({error: "Cannot post the new email"})
                    throw err;
                }
                else{
                    res.status(200);
                    console.log( "POST RESULT: ", result);
                    if (result.insertId>0){
                        console.log("post new email successfull. email_id: " + result.insertId );
                        res.json(result);
                    }else{
                        res.status(200);
                        res.json({"status":"error", "text": "The POST email is unsuccessfully", 
                        "email_to_table": email_to_table, 
                        "addres_to_id:": email_to_id, 
                        "insertId": result.insertId});
                    }
                }
            }
        );
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get emails with this parameters", "email_to_table": email_to_table, 
        "email_to_id:": email_to_id, "length":0});
    }
})

// use: PUT command http://127.0.0.1:3001/emails 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy partnerhez több cím is tartozhat.
// PUT az adat módosítása
router.put('/', (req, res)=>{
    var sql = `replace into emails (email_id, email_to_table, email_to_id, `+
        ` email, email_memo, email_default, `+
        ` email_modified, email_modified_by) `+
        ` VALUES ( ?, ?, ?, ?, ?, ?, ?, ?);`;
    let email_id = req.body.email_id;
    let email_to_table = req.body.email_to_table;
    let email_to_id = req.body.email_to_id;
    let email = req.body.email;
    let email_memo = req.body.email_memo;
    let email_default = req.body.email_default;
    let email_modified_by = req.body.email_modified_by;
    let email_modified = new Date().toISOString();
    try{
        con.query( sql, [email_id, email_to_table, email_to_id, 
            email, email_memo, email_default,  
            email_modified, email_modified_by], 
            function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot put the email"})
                throw err;
            }
            else{
                console.log( 'PUT RESULT', result);
                if (result.insertId>0){
                    console.log("put email successfull. email_id: " + result.insertId );
                    res.status(200);
                    result.status= "OK";
                    res.json( result);
                }else{
                    res.status(200);
                    result.status= "error";
                    result.errorText = "PUT insertId not found in result.";
                    result.email_id = email_id;
                    res.json(result);
                }
            }
        });
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot put email with id", "email_id": email_id });
    }
})

// use: DELETE command with this link http://127.0.0.1:3001/emails/2 ahol a 2-es email_id-jű címet akarjuk törölni.
router.delete('/:email_id', (req, res)=>{
    var sql = `delete from emails where email_id = ?`;
    let email_id = req.params.email_id;
    try{
        con.query( sql, email_id, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Can't delete email_id = "+ email_id})
                throw err;
            }
            else{
                res.status(200);
                if ( result.affectedRows>0){
                    console.log( "email_id = "+ email_id +" successfull deleted");
                    res.status(200);
                    result.status= "OK";
                    result.text_message = "email deleted.";
                    res.json(result);
                }else{
                    result.status= "error";
                    result.text_message = "email not deleted. affectedRows<1 in result.";
                    res.json(result);
                }
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get email_id = "+ email_id});
    }
})


// use: DELETE command with this link http://127.0.0.1:3001/emails/P&/2 ahol a 2-es partner_id-hez tartozó összes címet akarjuk törölni.
router.delete('/:email_to_table&/:email_to_id', (req, res)=>{
    var sql = `delete from emails where email_to_table = ? and email_to_id = ?`;
    let email_to_table = req.params.email_to_table;
    let email_to_id = req.params.email_to_id;
    try{
        con.query( sql, [email_to_table, email_to_id], function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Can't delete email_to_table = "+ email_to_table+ ' email_to_id = '+ email_to_id})
                throw err;
            }
            else{
                res.status(200);
                if (result.affectedRows>0){
                    console.log( "emails successfull deleted for email_to_table = "+ email_to_table+ ' email_to_id = '+ email_to_id );
                    res.status(200);
                    result.status= "OK";
                    result.text_message = result.affectedRows+ " emails deleted.";
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
        res.json({error: "Cannot get email_id = "+ email_id});
    }
})


module.exports = router;