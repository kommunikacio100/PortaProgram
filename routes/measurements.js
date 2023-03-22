const express = require("express");
const router = express.Router();
const con = require("../dbConfig");
const crypto = require('crypto');

// use: GET command with this link http://127.0.0.1:3001/measurements ahol az összes mérlegelést akarjuk visszakapni.
router.get('/', (req, res)=>{
    var sql = `select * from measurements`;
    try{
        con.query(sql, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get measurement"})
                throw err;
            }
            else{
                console.log("get measurements successfull");
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
        res.json({error: "Cannot get measurements"})
    }
});


// GET command with http://127.0.0.1:3001/measurements/2 ahol a 2-es measurement_id-jű mérlegelést akarjuk visszakapni.
router.get('/:measurement_id', (req, res)=>{
    var sql = `select * from measurements where measurement_id = ?`;
    let measurement_id = req.params.measurement_id;
    try{
        con.query(sql, measurement_id, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get measurement_id = "+ measurement_id})
                throw err;
            }
            else{
                if (result.length>0){
                    console.log("get measurement_id = "+ measurement_id +" successfull");

                    let rows = [];
                    console.log( result);
                    for(let row of result){
                        rows.push(JSON.parse(JSON.stringify(row)))
                    }
                    res.status(200);
                    res.json(rows);
                }else{
                    res.status(200);
                    res.json({"status":"No measurement", "text": "There is no measurement with this id = "+ measurement_id, "length":0});
                }
                
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get measurement_id = "+ measurement_id});
    }
})

// use: GET with http://127.0.0.1:3001/measurements/D/2 ahol a 2-es delivery_note-hoz tartozó összes mérlegelést akarjuk visszakapni.
// A D egy konstans érték és nincs vizsgálva hogy D van e ott, a lényeg hogy két paramétere legyen, ami által meg van különböztetve
// attól a gettől, amikor egy mérlegelés adatait kérjük le.
router.get('/:select_delivery_note&/:delivery_note_id', (req, res)=>{
    var sql = `select * from measurements where delivery_note_id = ?`;
    let delivery_note_id = req.params.delivery_note_id;
    try{
        con.query(sql, delivery_note_id, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get measurements for delivery_note_id = "+ delivery_note_id})
                throw err;
            }
            else{
                if (result.length>0){
                    console.log("get measurements for delivery_note_id = "+ delivery_note_id +" successfull");

                    let rows = [];
                    console.log( result);
                    for(let row of result){
                        rows.push(JSON.parse(JSON.stringify(row)))
                    }
                    res.status(200);
                    res.json(rows);
                }else{
                    res.status(200);
                    res.json({
                        "status":"No measurement", 
                        "text": "There is no measurements with this delivery_note_id = "+ delivery_note_id, 
                        "length":0});
                }
                
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get delivery_note_id = "+ delivery_note_id});
    }
})

// use: POST command http://127.0.0.1:3001/measurements 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy partnerhez több cím is tartozhat.
router.post('/', (req, res)=>{
    var sql = `insert into measurements ( 
            measurement_delivery_note_id, 
            delivery_note_vehicle_id, 
            measurement_product_id, 
            measurement_first_weight, 
            measurement_second_weight, 
            measurement_first_time, 
            measurement_second_time, 
            measurement_net_weight, 
            measurement_first_type, 
            measurement_second_type, 
            measurement_created_by) 
            VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    let measurement_delivery_note_id = req.body.measurement_delivery_note_id;
    let delivery_note_vehicle_id = req.body.delivery_note_vehicle_id;
    let measurement_product_id = req.body.measurement_product_id;
    let measurement_first_weight = req.body.measurement_first_weight;
    let measurement_second_weight = req.body.measurement_second_weight;
    let measurement_first_time = req.body.measurement_first_time;
    let measurement_second_time = req.body.measurement_second_time;
    let measurement_net_weight = req.body.measurement_net_weight;
    let measurement_first_type = req.body.measurement_first_type;
    let measurement_second_type = req.body.measurement_second_type;
    let measurement_created_by = req.body.measurement_created_by;
    try{
        con.query(sql, [
            measurement_delivery_note_id, 
            delivery_note_vehicle_id, 
            measurement_product_id, 
            measurement_first_weight, 
            measurement_second_weight, 
            measurement_first_time, 
            measurement_second_time, 
            measurement_net_weight, 
            measurement_first_type, 
            measurement_second_type, 
            measurement_created_by], 
            function (err, result) {
                if (err){
                    res.status(500)
                    res.json({error: "Cannot post the new measurement"})
                    throw err;
                }
                else{
                    res.status(200);
                    console.log( "POST RESULT: ", result);
                    if (result.insertId>0){
                        console.log("post new measurement successfull. measurement_id: " + result.insertId );
                        res.json(result);
                    }else{
                        res.status(200);
                        res.json({
                            "status":"error", 
                            "text": "The POST measurement is unsuccessfully. InsertId <= 0", 
                            "insertId": result.insertId});
                    }
                }
            }
        );
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get measurements with this parameters", "measurement_id": measurement_id, "length":0});
    }
})

// use: PUT command http://127.0.0.1:3001/measurements 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy partnerhez több cím is tartozhat.
// PUT az adat módosítása
router.put('/', (req, res)=>{
    var sql = `replace into measurements ( measurement_id, 
            measurement_delivery_note_id, 
            delivery_note_vehicle_id, 
            measurement_product_id, 
            measurement_first_weight, 
            measurement_second_weight, 
            measurement_first_time, 
            measurement_second_time, 
            measurement_net_weight, 
            measurement_first_type, 
            measurement_second_type, 
            measurement_modified, 
            measurement_modified_by) 
            VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    let measurement_id = req.body.measurement_id;
    let measurement_delivery_note_id = req.body.measurement_delivery_note_id;
    let delivery_note_vehicle_id = req.body.delivery_note_vehicle_id;
    let measurement_product_id = req.body.measurement_product_id;
    let measurement_first_weight = req.body.measurement_first_weight;
    let measurement_second_weight = req.body.measurement_second_weight;
    let measurement_first_time = req.body.measurement_first_time;
    let measurement_second_time = req.body.measurement_second_time;
    let measurement_net_weight = req.body.measurement_net_weight;
    let measurement_first_type = req.body.measurement_first_type;
    let measurement_second_type = req.body.measurement_second_type;
    let measurement_modified = new Date().toISOString();
    let measurement_modified_by = req.body.measurement_modified_by;
    try{
        con.query(sql, [measurement_id, 
            measurement_delivery_note_id, 
            delivery_note_vehicle_id, 
            measurement_product_id, 
            measurement_first_weight, 
            measurement_second_weight, 
            measurement_first_time, 
            measurement_second_time, 
            measurement_net_weight, 
            measurement_first_type, 
            measurement_second_type, 
            measurement_modified, 
            measurement_modified_by], 
            function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot put the measurement"})
                throw err;
            }
            else{
                console.log( 'PUT RESULT', result);
                if (result.insertId>0){
                    console.log("put measurement successfull. measurement_id: " + result.insertId );
                    res.status(200);
                    result.status= "OK";
                    res.json( result);
                }else{
                    res.status(200);
                    result.status= "error";
                    result.errorText = "PUT insertId not found in result.";
                    result.measurement_id = measurement_id;
                    res.json(result);
                }
            }
        });
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot put measurement with id", "measurement_id": measurement_id });
    }
})

// use: DELETE command with this link http://127.0.0.1:3001/measurements/2 ahol a 2-es measurement_id-jű címet akarjuk törölni.
router.delete('/:measurement_id', (req, res)=>{
    var sql = `delete from measurements where measurement_id = ?`;
    let measurement_id = req.params.measurement_id;
    try{
        con.query( sql, measurement_id, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Can't delete measurement_id = "+ measurement_id})
                throw err;
            }
            else{
                res.status(200);
                if ( result.affectedRows>0){
                    console.log( "measurement_id = "+ measurement_id +" successfull deleted");
                    res.status(200);
                    result.status= "OK";
                    result.text_message = "measurement deleted.";
                    res.json(result);
                }else{
                    result.status= "error";
                    result.text_message = "measurement not deleted. affectedRows<1 in result.";
                    res.json(result);
                }
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get measurement_id = "+ measurement_id});
    }
})



module.exports = router;