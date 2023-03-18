const express = require("express");
const router = express.Router();
const con = require("../dbConfig");
const crypto = require('crypto');


// use: GET command with this link http://127.0.0.1:3001/addresses ahol az összes címet akarjuk visszakapni.
router.get('/', (req, res)=>{
    var sql = `select * from addresses`;
    try{
        con.query(sql, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get adresses"})
                throw err;
            }
            else{
                console.log("get addresses successfull");
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
        res.json({error: "Cannot get addresses"})
    }
});


// use: GET command with this link http://127.0.0.1:3001/addresses/2 ahol a 2-es address_id-jű címet akarjuk visszakapni.
router.get('/:address_id', (req, res)=>{
    var sql = `select * from addresses where address_id = ?`;
    let address_id = req.params.address_id;
    try{
        con.query(sql, address_id, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get address_id = "+ address_id})
                throw err;
            }
            else{
                if (result.length>0){
                    console.log("get address_id = "+ address_id +" successfull");

                    let rows = [];
                    console.log( result);
                    for(let row of result){
                        rows.push(JSON.parse(JSON.stringify(row)))
                    }
                    res.status(200);
                    res.json(rows);
                }else{
                    res.status(200);
                    res.json({"status":"No address", "text": "There is no address with this id = "+ address_id, "length":0});
                }
                
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get address_id = "+ address_id});
    }
})


// use: GET command with this link http://127.0.0.1:3001/addresses/P&/2&/true 
// ahol P a Partner táblát választja ki, és a 2-es partner_id-jű partnert, és csak a default címeket.
// Egy partnerhez több cím is tartozhat.
router.get('/:address_to_table&/:address_to_id&/:default_address', (req, res)=>{
    var sql = `select * from addresses where address_to_table = ? and address_to_id = ?`;
    let address_to_table = req.params.address_to_table;
    let address_to_id = req.params.address_to_id;
    let default_address = req.params.default_address;
    if (default_address!=null) sql+= ` and default_address = ` + default_address;
    try{
        con.query(sql, [address_to_table, address_to_id, default_address], function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get address_to_table = "+ address_to_table+ " addres_to_id: "+ address_to_id})
                throw err;
            }
            else{
                if (result.length>0){
                    console.log("get address successfull. address_to_table = "+ address_to_table+ " addres_to_id: "+ address_to_id);

                    let rows = [];
                    console.log( result);
                    for(let row of result){
                        rows.push(JSON.parse(JSON.stringify(row)))
                    }
                    res.status(200);
                    res.json(rows);
                }else{
                    res.status(200);
                    res.json({"status":"No address", "text": "There is no address with this parameters", 
                    "address_to_table": address_to_table, 
                    "addres_to_id:": address_to_id, 
                    "default_address:": default_address,
                    "length":0});
                }
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get addresses with this parameters", "address_to_table": address_to_table, 
        "addres_to_id:": address_to_id, "length":0});
    }
})


// use: GET command with this link http://127.0.0.1:3001/addresses/P&/2 
// ahol P a Partner táblát választja ki, és a 2-es partner_id-jű partnert, mindegy hogy default vagy nem.
// Egy partnerhez több cím is tartozhat.
router.get('/:address_to_table&/:address_to_id', (req, res)=>{
    var sql = `select * from addresses where address_to_table = ? and address_to_id = ?`;
    let address_to_table = req.params.address_to_table;
    let address_to_id = req.params.address_to_id;
    try{
        con.query(sql, [address_to_table, address_to_id], function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get address_to_table = "+ address_to_table+ " addres_to_id: "+ address_to_id})
                throw err;
            }
            else{
                if (result.length>0){
                    console.log("get address successfull. address_to_table = "+ address_to_table+ " addres_to_id: "+ address_to_id);

                    let rows = [];
                    console.log( result);
                    for(let row of result){
                        rows.push(JSON.parse(JSON.stringify(row)))
                    }
                    res.status(200);
                    res.json(rows);
                }else{
                    res.status(200);
                    res.json({"status":"No address", "text": "There is no address with this parameters", 
                    "address_to_table": address_to_table, 
                    "addres_to_id:": address_to_id, 
                    "length":0});
                }
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get addresses with this parameters", "address_to_table": address_to_table, 
        "addres_to_id:": address_to_id, "length":0});
    }
})

// use: POST command http://127.0.0.1:3001/addresses 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy partnerhez több cím is tartozhat.
router.post('/', (req, res)=>{
    var sql = `insert into addresses (address_to_table, address_to_id, default_address, `+
        `country_code, zip_code, city, street_name, street_type, street_number, `+
        `lot_number, gps_latitude, gps_longitude,`+
        ` address_created_by) `+
        ` VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    let address_to_table = req.body.address_to_table;
    let address_to_id = req.body.address_to_id;
    let default_address = req.body.default_address;
    let country_code = req.body.country_code;
    let zip_code = req.body.zip_code;
    let city = req.body.city;
    let street_name = req.body.street_name;
    let street_type = req.body.street_type;
    let street_number = req.body.street_number;
    let lot_number = req.body.lot_number;
    let gps_latitude = req.body.dps_latitude;
    let gps_longitude = req.body.gps_longitude;
    let address_created_by = req.body.address_created_by;
    try{
        con.query(sql, [address_to_table, address_to_id, default_address, 
            country_code, zip_code, city, street_name, street_type, street_number, 
            lot_number, gps_latitude, gps_longitude, address_created_by], 
            function (err, result) {
                if (err){
                    res.status(500)
                    res.json({error: "Cannot post the new address"})
                    throw err;
                }
                else{
                    res.status(200);
                    console.log( "POST RESULT: ", result);
                    if (result.insertId>0){
                        console.log("post new address successfull. address_id: " + result.insertId );
                        res.json(result);
                    }else{
                        res.status(200);
                        res.json({"status":"error", "text": "The POST address is unsuccessfully", 
                        "address_to_table": address_to_table, 
                        "addres_to_id:": address_to_id, 
                        "insertId": result.insertId});
                    }
                }
            }
        );
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get addresses with this parameters", "address_to_table": address_to_table, 
        "addres_to_id:": address_to_id, "length":0});
    }
})

// use: PUT command http://127.0.0.1:3001/addresses 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy partnerhez több cím is tartozhat.
// PUT az adat módosítása
router.put('/', (req, res)=>{
    var sql = `replace into addresses (address_id, address_to_table, address_to_id, default_address, `+
        `country_code, zip_code, city, street_name, street_type, street_number, `+
        `lot_number, gps_latitude, gps_longitude,`+
        ` address_modified, address_modified_by) `+
        ` VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    let address_id = req.body.address_id;
    let address_to_table = req.body.address_to_table;
    let address_to_id = req.body.address_to_id;
    let default_address = req.body.default_address;
    let country_code = req.body.country_code;
    let zip_code = req.body.zip_code;
    let city = req.body.city;
    let street_name = req.body.street_name;
    let street_type = req.body.street_type;
    let street_number = req.body.street_number;
    let lot_number = req.body.lot_number;
    let gps_latitude = req.body.dps_latitude;
    let gps_longitude = req.body.gps_longitude;
    let address_modified_by = req.body.address_modified_by;
    let address_modified = new Date().toISOString();
    try{
        con.query(sql, [address_id, address_to_table, address_to_id, default_address, 
            country_code, zip_code, city, street_name, street_type, street_number, 
            lot_number, gps_latitude, gps_longitude, address_modified, address_modified_by], 
            function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot put the address"})
                throw err;
            }
            else{
                console.log( 'PUT RESULT', result);
                if (result.insertId>0){
                    console.log("put address successfull. address_id: " + result.insertId );
                    res.status(200);
                    result.status= "OK";
                    res.json( result);
                }else{
                    res.status(200);
                    result.status= "error";
                    result.errorText = "PUT insertId not found in result.";
                    result.address_id = address_id;
                    res.json(result);
                }
            }
        });
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot put address with id", "address_id": address_id });
    }
})

// use: DELETE command with this link http://127.0.0.1:3001/addresses/2 ahol a 2-es address_id-jű címet akarjuk törölni.
router.delete('/:address_id', (req, res)=>{
    var sql = `delete from addresses where address_id = ?`;
    let address_id = req.params.address_id;
    try{
        con.query( sql, address_id, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Can't delete address_id = "+ address_id})
                throw err;
            }
            else{
                res.status(200);
                if ( result.affectedRows>0){
                    console.log( "address_id = "+ address_id +" successfull deleted");
                    res.status(200);
                    result.status= "OK";
                    result.text_message = "address deleted.";
                    res.json(result);
                }else{
                    result.status= "error";
                    result.text_message = "address not deleted. affectedRows<1 in result.";
                    res.json(result);
                }
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get address_id = "+ address_id});
    }
})


// use: DELETE command with this link http://127.0.0.1:3001/addresses/P&/2 ahol a 2-es partner_id-hez tartozó összes címet akarjuk törölni.
router.delete('/:address_to_table&/:address_to_id', (req, res)=>{
    var sql = `delete from addresses where address_to_table = ? and address_to_id = ?`;
    let address_to_table = req.params.address_to_table;
    let address_to_id = req.params.address_to_id;
    try{
        con.query( sql, [address_to_table, address_to_id], function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Can't delete address_to_table = "+ address_to_table+ ' address_to_id = '+ address_to_id})
                throw err;
            }
            else{
                res.status(200);
                if (result.affectedRows>0){
                    console.log( "Addresses successfull deleted for address_to_table = "+ address_to_table+ ' address_to_id = '+ address_to_id );
                    res.status(200);
                    result.status= "OK";
                    result.text_message = result.affectedRows+ " addresses deleted.";
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
        res.json({error: "Cannot get address_id = "+ address_id});
    }
})


module.exports = router;