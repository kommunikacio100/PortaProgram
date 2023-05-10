const express = require("express");
const router = express.Router();
const con = require("../dbConfig");
const crypto = require('crypto');

// use: GET command with this link http://127.0.0.1:3001/partners ahol az összes címet akarjuk visszakapni.
router.get('/', (req, res) => {
    var sql = `select * from partners`;
    try {
        con.query(sql, function (err, result) {
            if (err) {
                res.status(500)
                res.json({ error: "Cannot get partner" })
                throw err;
            }
            else {
                console.log("get partners successfull");
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
        res.status(500)
        res.json({ error: "Cannot get partners" })
    }
});


// use: GET command with this link http://127.0.0.1:3001/partners/2 ahol a 2-es partner_id-jű címet akarjuk visszakapni.
router.get('/:id', (req, res) => {
    var sql = `select * from partners where id = ?`;
    let id = req.params.id;
    try {
        con.query(sql, id, function (err, result) {
            if (err) {
                res.status(500)
                res.json({ error: "Cannot get id = " + id })
                throw err;
            }
            else {
                if (result.length > 0) {
                    console.log("get id = " + id + " successfull");

                    let rows = [];
                    console.log(result);
                    for (let row of result) {
                        rows.push(JSON.parse(JSON.stringify(row)))
                    }
                    res.status(200);
                    res.json(rows);
                } else {
                    res.status(200);
                    result.status = "partner not found";
                    result.text = "There is no partner with this id = " + id;
                    res.json(result);
                    console.log(JSON.stringify(result));
                }

            }
        });

    } catch (e) {
        console.error(e);
        res.status(500);
        res.json({ error: "Cannot get id = " + id });
    }
})


// use: POST command http://127.0.0.1:3001/partners 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy partnerhez több cím is tartozhat.
router.post('/', (req, res) => {
    var sql = `insert into partners (vat_number, name, memo, ` +
        ` bank_account, created_by) ` +
        ` VALUES ( ?, ?, ?, ?, ?);`;
    let vat_number = req.body.vat_number;
    let name = req.body.name;
    let memo = req.body.memo;
    let bank_account = req.body.bank_account;
    let created_by = req.body.created_by;
    try {
        con.query(sql, [vat_number, name, memo, bank_account,
            created_by],
            function (err, result) {
                if (err) {
                    res.status(500)
                    res.json({ error: "Cannot post the new partner" })
                    throw err;
                }
                else {
                    res.status(200);
                    console.log("POST RESULT: ", result);
                    if (result.insertId > 0) {
                        console.log("post new partner successfull. id: " + result.insertId);
                        res.json(result);
                    } else {
                        res.status(200);
                        res.json({
                            "status": "error", "text": "The POST partner is unsuccessfully",
                            "name": name,
                            "insertId": result.insertId
                        });
                    }
                }
            }
        );

    } catch (e) {
        console.error(e);
        res.status(500);
        res.json({ error: "Cannot get partners with this parameters", "partner_id": partner_id, "length": 0 });
    }
})

// use: PUT command http://127.0.0.1:3001/partners 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy partnerhez több cím is tartozhat.
// PUT az adat módosítása
router.put('/', (req, res) => {
    var sql = `replace into partners ( id, ` +
        ` vat_number, name, memo, ` +
        ` bank_account, modified, modified_by) ` +
        ` VALUES ( ?, ?, ?, ?, ?, ?, ?);`;
    let id = req.body.id;
    let vat_number = req.body.vat_number;
    let name = req.body.name;
    let memo = req.body.memo;
    let bank_account = req.body.bank_account;
    let modified = new Date().toISOString();
    let modified_by = req.body.modified_by;
    try {
        con.query(sql, [id, vat_number, name,
            memo, bank_account, modified, modified_by],
            function (err, result) {
                if (err) {
                    res.status(500)
                    res.json({ error: "Cannot put the partner" })
                    throw err;
                }
                else {
                    console.log('PUT RESULT', result);
                    if (result.insertId > 0) {
                        console.log("put partner successfull. id: " + result.insertId);
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
        res.json({ error: "Cannot put partner with id", "partner_id": partner_id });
    }
});

// use: DELETE command with this link http://127.0.0.1:3001/partners/2 ahol a 2-es partner_id-jű partnert akarjuk törölni.
router.delete('/:id', (req, res) => {
    var sql = `delete from partners where id = ?`;
    let id = req.params.id;
    try {
        con.query(sql, id, function (err, result) {
            if (err) {
                res.status(500)
                res.json({ error: "Can't delete id = " + id })
                throw err;
            }
            else {
                res.status(200);
                if (result.affectedRows > 0) {
                    console.log("id = " + id + " successfull deleted");
                    res.status(200);
                    result.status = "OK";
                    result.text_message = "partner deleted.";
                    res.json(result);
                } else {
                    result.status = "error";
                    result.text_message = "partner not deleted. affectedRows<1 in result.";
                    res.json(result);
                }
            }
        });
        

    } catch (e) {
        console.error(e);
        res.status(500);
        res.json({ error: "Cannot get id = " + id });
    }
})

module.exports = router;