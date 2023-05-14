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
    var sql = `select * from delivery_notes where id = ?`;
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
    // var insert_sql = `insert into delivery_notes ( `+
    // `serial_no, owner_id, owner_address_id, `+
    // `loadlocation_address_id, partner_id, `+
    // `partner_address_id, unloadlocation_address_id, `+
    // `carrier_id, carrier_address_id, movement_id, `+
    // `status, created_by) `+
    // ` VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    var sql = `call new_delivery_note( @id, @serial_no); select @id, @serial_no;`;

    // let owner_id = req.body.owner_id;
    // let owner_address_id = req.body.owner_address_id;
    // let loadlocation_address_id = req.body.loadlocation_address_id;
    // let partner_id = req.body.partner_id;
    // let partner_address_id = req.body.partner_address_id;
    // let unloadlocation_address_id = req.body.unloadlocation_address_id;
    // let carrier_id = req.body.carrier_id;
    // let carrier_address_id = req.body.carrier_address_id;
    // let movement_id = req.body.movement_id;
    // let status = req.body.status;
    // let created_by = req.body.created_by;
    try {
        // con.query(sql, [serial_no, owner_id, 
        //     owner_address_id, loadlocation_address_id,
        //     partner_id, partner_address_id,
        //     unloadlocation_address_id, carrier_id,
        //     carrier_address_id, movement_id, status,
        //     created_by],
        con.query( sql, [],
            function (err, result) {
                if (err) {
                    res.status(500)
                    res.json({ error: "Cannot post the new delivery_note" })
                    throw err;
                }
                else {
                    res.status(200);
                    console.log("POST RESULT: ", result);
                    if (result[0]["@id"] > 0) {
                        console.log("post new delivery_note successfull. delivery_note_id: " + result[0]["@id"]);
                        res.json(result);
                    } else {
                        res.status(200);
                        res.json({
                            "status": "error", "text": "The POST delivery_note is unsuccessfully",
                            "serial_no": result[0]["@serial_no"],
                            "insertId": result.insertId
                        });
                    }
                }
            }
        );

    } catch (e) {
        console.error(e);
        res.status(500);
        res.json({ error: "Cannot post delivery_note"});
    }
})

// use: PUT command http://127.0.0.1:3001/delivery_notes 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy delivery_notehez több cím is tartozhat.
// PUT az adat módosítása
router.put('/', (req, res) => {
    var sql = `replace into delivery_notes ( id, ` +
        `serial_no, owner_id, owner_address_id, `+
        `loadlocation_address_id, partner_id, `+
        `partner_address_id, unloadlocation_address_id, `+
        `carrier_id, carrier_address_id, movement_id, `+
        `status, modified, modified_by) ` +
        ` VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    //console.log( 'req.body', req.body);
    let id = req.body.id;
    let serial_no = req.body.serial_no;
    let owner_id = req.body.owner_id;
    let owner_address_id = req.body.owner_address_id;
    if (owner_address_id ==='') owner_address_id = null;
    //console.log( 'owner_address_id', owner_address_id);
    let loadlocation_address_id = req.body.loadlocation_address_id;
    if (loadlocation_address_id ==='') loadlocation_address_id = null;
    let partner_id = req.body.partner_id;
    let partner_address_id = req.body.partner_address_id;
    if (partner_address_id ==='') partner_address_id = null;
    let unloadlocation_address_id = req.body.unloadlocation_address_id;
    if (unloadlocation_address_id ==='') unloadlocation_address_id = null;
    let carrier_id = req.body.carrier_id;
    let carrier_address_id = req.body.carrier_address_id;
    if (carrier_address_id ==='') carrier_address_id = null;
    let movement_id = req.body.movement_id;
    let status = req.body.status;
    let modified = new Date().toISOString();
    let modified_by = req.body.modified_by;
    try {
        con.query(sql, [id, 
            serial_no, owner_id, 
            owner_address_id, loadlocation_address_id,
            partner_id, partner_address_id,
            unloadlocation_address_id, carrier_id,
            carrier_address_id, movement_id, status,
            modified, modified_by],
            function (err, result) {
                if (err) {
                    res.status(500)
                    res.json({ error: "Cannot put the delivery_note" })
                    throw err;
                }
                else {
                    console.log('PUT RESULT', result);
                    if (result.insertId > 0) {
                        console.log("put delivery_note successfull. id: " + result.insertId);
                        res.status(200);
                        result.status = "OK";
                        res.json(result);
                    } else {
                        res.status(200);
                        result.status = "error";
                        result.errorText = "PUT insertId not found in result.";
                        result.id = id;
                        res.json(result);
                    }
                }
            });
    } catch (e) {
        console.error(e);
        res.status(500);
        res.json({ error: "Cannot put delivery_note with id", "id": id });
    }
});

// use: DELETE command with this link http://127.0.0.1:3001/delivery_notes/2 ahol a 2-es delivery_note_id-jű delivery_notet akarjuk törölni.
router.delete('/:id', (req, res) => {
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