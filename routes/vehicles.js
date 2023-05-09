const express = require("express");
const router = express.Router();
const con = require("../dbConfig");
const crypto = require('crypto');

router.get('/', (req, res)=>{
    var sql = `select * from vehicles  order by plate_number1`;
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
        res.json({error: "Cannot get vehicles"})
    }
});

// use: GET command with this link http://127.0.0.1:3001/vehicles/2 ahol a 2-es vehicle_id-jű címet akarjuk visszakapni.
router.get('/:vehicle_id', (req, res)=>{
    var sql = `select * from vehicles where id = ?`;
    let vehicle_id = req.params.vehicle_id;
    try{
        con.query(sql, vehicle_id, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get vehicle_id = "+ vehicle_id})
                throw err;
            }
            else{
                if (result.length>0){
                    console.log("get vehicle_id = "+ vehicle_id +" successfull");

                    let rows = [];
                    console.log( result);
                    for(let row of result){
                        rows.push(JSON.parse(JSON.stringify(row)))
                    }
                    res.status(200);
                    res.json(rows);
                }else{
                    res.status(200);
                    result.status = "vehicle not found";
                    result.text = "There is no vehicle with this id = "+ vehicle_id;
                    res.json( result);
                    console.log( JSON.stringify( result));
                }
                
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get vehicle_id = "+ vehicle_id});
    }
})


// use: POST command http://127.0.0.1:3001/vehicles 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy partnerhez több cím is tartozhat.
router.post('/', (req, res)=>{
    var sql = `insert into vehicles (plate_number1, country_code1, `+
    `plate_number2, country_code2, plate_number3, country_code3,`+
    `empty_weight, empty_time,`+
    ` created_by) `+
    ` VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    let vehicle_plate_number1 = req.body.plate_number1;
    let vehicle_country_code1 = req.body.country_code1;
    let vehicle_plate_number2 = req.body.plate_number2;
    let vehicle_country_code2 = req.body.country_code2;
    let vehicle_plate_number3 = req.body.plate_number3;
    let vehicle_country_code3 = req.body.country_code3;
    let vehicle_empty_weight = req.body.empty_weight;
    let vehicle_empty_time = req.body.empty_time;
    let vehicle_created_by = req.body.created_by;
    try{
        con.query(sql, [vehicle_plate_number1, vehicle_country_code1, 
            vehicle_plate_number2, vehicle_country_code2, 
            vehicle_plate_number3, vehicle_country_code3, 
            vehicle_empty_weight, vehicle_empty_time,
            vehicle_created_by], 
            function (err, result) {
                if (err){
                    res.status(500)
                    res.json({error: "Cannot post the new vehicle"})
                    throw err;
                }
                else{
                    res.status(200);
                    console.log( "POST RESULT: ", result);
                    if (result.insertId>0){
                        console.log("post new vehicle successfull. vehicle_id: " + result.insertId );
                        res.json(result);
                    }else{
                        res.status(200);
                        res.json({"status":"error", "text": "The POST vehicle is unsuccessfully", 
                        "vehicle_name": vehicle_name, 
                        "insertId": result.insertId});
                    }
                }
            }
        );
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get vehicles with this parameters", "vehicle_id": vehicle_id, "length":0});
    }
})

// use: PUT command http://127.0.0.1:3001/vehicles 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy partnerhez több cím is tartozhat.
// PUT az adat módosítása
router.put('/', (req, res)=>{
    var sql = `replace into vehicles (id, plate_number1, country_code1, `+
    `plate_number2, country_code2, plate_number3, country_code3,`+
    `empty_weight, empty_time,`+
    ` created_by) `+
    ` VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    let id = req.body.id;
    let plate_number1 = req.body.plate_number1;
    let country_code1 = req.body.country_code1;
    let plate_number2 = req.body.plate_number2;
    let country_code2 = req.body.country_code2;
    let plate_number3 = req.body.plate_number3;
    let country_code3 = req.body.country_code3;
    let empty_weight = req.body.empty_weight;
    let empty_time = req.body.empty_time;
    let modified = new Date().toISOString();
    let modified_by = req.body.modified_by;
    try{
        con.query(sql, [id,
            plate_number1, country_code1, 
            plate_number2, country_code2, 
            plate_number3, country_code3, 
            empty_weight, empty_time,
            modified, modified_by], 
            function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot put the vehicle"})
                throw err;
            }
            else{
                console.log( 'PUT RESULT', result);
                if (result.insertId>0){
                    console.log("put vehicle successfull. id: " + result.insertId );
                    res.status(200);
                    result.status= "OK";
                    res.json( result);
                }else{
                    res.status(200);
                    result.status= "error";
                    result.errorText = "PUT insertId not found in result.";
                    result.vehicle_id = vehicle_id;
                    res.json(result);
                }
            }
        });
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot put vehicle with id", "vehicle_id": vehicle_id });
    }
});

// use: DELETE command with this link http://127.0.0.1:3001/vehicles/2 ahol a 2-es vehicle_id-jű címet akarjuk törölni.
router.delete('/:vehicle_id', (req, res)=>{
    var sql = `delete from vehicles where id = ?`;
    let vehicle_id = req.params.vehicle_id;
    try{
        con.query( sql, vehicle_id, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Can't delete vehicle_id = "+ vehicle_id})
                throw err;
            }
            else{
                res.status(200);
                if ( result.affectedRows>0){
                    console.log( "vehicle_id = "+ vehicle_id +" successfull deleted");
                    res.status(200);
                    result.status= "OK";
                    result.text_message = "vehicle deleted.";
                    res.json(result);
                }else{
                    result.status= "error";
                    result.text_message = "vehicle not deleted. affectedRows<1 in result.";
                    res.json(result);
                }
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get vehicle_id = "+ vehicle_id});
    }
})



module.exports = router;