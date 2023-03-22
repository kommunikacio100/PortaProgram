const express = require("express");
const router = express.Router();
const con = require("../dbConfig");
const crypto = require('crypto');

// use: GET command with this link http://127.0.0.1:3001/delivery_notes ahol az összes szállítólevél fejlécet akarjuk visszakapni.
router.get('/', (req, res) => {
    var sql = `select * from delivery_notes`;
    try {
        con.query(sql, function (err, result) {
            if (err) {
                res.status(500);
                res.json({ error: "Cannot get delivery_notes" })
                throw err;
            }
            else {
                console.log("get delivery_notes successfull");
                let rows = [];
                console.log(result);
                for (let row of result) {
                    rows.push(JSON.parse(JSON.stringify(row)))
                }
                res.status(200);
                res.json(rows);
            }
        });

    } catch (e) {
        console.error(e);
        res.status(500);
        res.json({ error: "Cannot get delivery_notes" });
    }
});


// use: GET command with this link http://127.0.0.1:3001/delivery_notes/2 ahol a 2-es delivery_note_id-jű címet akarjuk visszakapni.
router.get('/:delivery_note_id', (req, res) => {
    var sql = `select * from delivery_notes where delivery_note_id = ?`;
    let delivery_note_id = req.params.delivery_note_id;
    try {
        con.query(sql, delivery_note_id, function (err, result) {
            if (err) {
                res.status(500)
                res.json({ error: "Cannot get delivery_note_id = " + delivery_note_id })
                throw err;
            }
            else {
                if (result.length > 0) {
                    console.log("get delivery_note_id = " + delivery_note_id + " successfull");

                    let rows = [];
                    console.log(result);
                    for (let row of result) {
                        rows.push(JSON.parse(JSON.stringify(row)))
                    }
                    res.status(200);
                    res.json(rows);
                } else {
                    res.status(200);
                    result.status = "delivery_note not found";
                    result.text = "There is no delivery_note with this id = " + delivery_note_id;
                    res.json(result);
                    console.log(JSON.stringify(result));
                }

            }
        });

    } catch (e) {
        console.error(e);
        res.status(500);
        res.json({ error: "Cannot get delivery_note_id = " + delivery_note_id });
    }
})


// use: POST command http://127.0.0.1:3001/delivery_notes 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy delivery_notehez több cím is tartozhat.
router.post('/', (req, res) => {
    var sql = `insert into delivery_notes ( `+
    `delivery_note_serial_no, delivery_note_owner_id, delivery_note_owner_address_id, `+
    `delivery_note_loadlocation_address_id, delivery_note_partner_id, `+
    `delivery_note_partner_address_id, delivery_note_unloadlocation_address_id, `+
    `delivery_note_carrier_id, delivery_note_carrier_address_id, delivery_note_movement_id, `+
    `delivery_note_status, delivery_note_created_by) `+
    ` VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    let delivery_note_serial_no = req.body.delivery_note_serial_no;
    let delivery_note_owner_id = req.body.delivery_note_owner_id;
    let delivery_note_owner_address_id = req.body.delivery_note_owner_address_id;
    let delivery_note_loadlocation_address_id = req.body.delivery_note_loadlocation_address_id;
    let delivery_note_partner_id = req.body.delivery_note_partner_id;
    let delivery_note_partner_address_id = req.body.delivery_note_partner_address_id;
    let delivery_note_unloadlocation_address_id = req.body.delivery_note_unloadlocation_address_id;
    let delivery_note_carrier_id = req.body.delivery_note_carrier_id;
    let delivery_note_carrier_address_id = req.body.delivery_note_carrier_address_id;
    let delivery_note_movement_id = req.body.delivery_note_movement_id;
    let delivery_note_status = req.body.delivery_note_status;
    let delivery_note_created_by = req.body.delivery_note_created_by;
    try {
        con.query(sql, [delivery_note_serial_no, delivery_note_owner_id, 
            delivery_note_owner_address_id, delivery_note_loadlocation_address_id,
            delivery_note_partner_id, delivery_note_partner_address_id,
            delivery_note_unloadlocation_address_id, delivery_note_carrier_id,
            delivery_note_carrier_address_id, delivery_note_movement_id, delivery_note_status,
            delivery_note_created_by],
            function (err, result) {
                if (err) {
                    res.status(500)
                    res.json({ error: "Cannot post the new delivery_note" })
                    throw err;
                }
                else {
                    res.status(200);
                    console.log("POST RESULT: ", result);
                    if (result.insertId > 0) {
                        console.log("post new delivery_note successfull. delivery_note_id: " + result.insertId);
                        res.json(result);
                    } else {
                        res.status(200);
                        res.json({
                            "status": "error", "text": "The POST delivery_note is unsuccessfully",
                            "delivery_note_name": delivery_note_name,
                            "insertId": result.insertId
                        });
                    }
                }
            }
        );

    } catch (e) {
        console.error(e);
        res.status(500);
        res.json({ error: "Cannot get delivery_notes with this parameters", "delivery_note_id": delivery_note_id, "length": 0 });
    }
})

// use: PUT command http://127.0.0.1:3001/delivery_notes 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy delivery_notehez több cím is tartozhat.
// PUT az adat módosítása
router.put('/', (req, res) => {
    var sql = `replace into delivery_notes ( delivery_note_id, ` +
        `delivery_note_serial_no, delivery_note_owner_id, delivery_note_owner_address_id, `+
        `delivery_note_loadlocation_address_id, delivery_note_partner_id, `+
        `delivery_note_partner_address_id, delivery_note_unloadlocation_address_id, `+
        `delivery_note_carrier_id, delivery_note_carrier_address_id, delivery_note_movement_id, `+
        `delivery_note_status, delivery_note_modified, delivery_note_modified_by) ` +
        ` VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    let delivery_note_id = req.body.delivery_note_id;
    let delivery_note_serial_no = req.body.delivery_note_serial_no;
    let delivery_note_owner_id = req.body.delivery_note_owner_id;
    let delivery_note_owner_address_id = req.body.delivery_note_owner_address_id;
    let delivery_note_loadlocation_address_id = req.body.delivery_note_loadlocation_address_id;
    let delivery_note_partner_id = req.body.delivery_note_partner_id;
    let delivery_note_partner_address_id = req.body.delivery_note_partner_address_id;
    let delivery_note_unloadlocation_address_id = req.body.delivery_note_unloadlocation_address_id;
    let delivery_note_carrier_id = req.body.delivery_note_carrier_id;
    let delivery_note_carrier_address_id = req.body.delivery_note_carrier_address_id;
    let delivery_note_movement_id = req.body.delivery_note_movement_id;
    let delivery_note_status = req.body.delivery_note_status;
    let delivery_note_modified = new Date().toISOString();
    let delivery_note_modified_by = req.body.delivery_note_modified_by;
    try {
        con.query(sql, [delivery_note_id, 
            delivery_note_serial_no, delivery_note_owner_id, 
            delivery_note_owner_address_id, delivery_note_loadlocation_address_id,
            delivery_note_partner_id, delivery_note_partner_address_id,
            delivery_note_unloadlocation_address_id, delivery_note_carrier_id,
            delivery_note_carrier_address_id, delivery_note_movement_id, delivery_note_status,
            delivery_note_modified, delivery_note_modified_by],
            function (err, result) {
                if (err) {
                    res.status(500)
                    res.json({ error: "Cannot put the delivery_note" })
                    throw err;
                }
                else {
                    console.log('PUT RESULT', result);
                    if (result.insertId > 0) {
                        console.log("put delivery_note successfull. delivery_note_id: " + result.insertId);
                        res.status(200);
                        result.status = "OK";
                        res.json(result);
                    } else {
                        res.status(200);
                        result.status = "error";
                        result.errorText = "PUT insertId not found in result.";
                        result.delivery_note_id = delivery_note_id;
                        res.json(result);
                    }
                }
            });
    } catch (e) {
        console.error(e);
        res.status(500);
        res.json({ error: "Cannot put delivery_note with id", "delivery_note_id": delivery_note_id });
    }
});

// use: DELETE command with this link http://127.0.0.1:3001/delivery_notes/2 ahol a 2-es delivery_note_id-jű delivery_notet akarjuk törölni.
router.delete('/:delivery_note_id', (req, res) => {
    return ({"status":"error", "error_text":"A szállítólevelek nem törölhetők."});
/*    var sql = `delete from delivery_notes where delivery_note_id = ?`;
    let delivery_note_id = req.params.delivery_note_id;
    try {
        con.query(sql, delivery_note_id, function (err, result) {
            if (err) {
                res.status(500)
                res.json({ error: "Can't delete delivery_note_id = " + delivery_note_id })
                throw err;
            }
            else {
                res.status(200);
                if (result.affectedRows > 0) {
                    console.log("delivery_note_id = " + delivery_note_id + " successfull deleted");
                    res.status(200);
                    result.status = "OK";
                    result.text_message = "delivery_note deleted.";
                    res.json(result);
                } else {
                    result.status = "error";
                    result.text_message = "delivery_note not deleted. affectedRows<1 in result.";
                    res.json(result);
                }
            }
        });

    } catch (e) {
        console.error(e);
        res.status(500);
        res.json({ error: "Cannot get delivery_note_id = " + delivery_note_id });
    }*/
})

module.exports = router;