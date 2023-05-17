const express = require("express");
const router = express.Router();
const con = require("../dbConfig");
const verifyToken = require('../verifyToken');
router.use( verifyToken);

// use: GET command with this link http://127.0.0.1:3001/products ahol az összes címet akarjuk visszakapni.
router.get('/', (req, res)=>{
    var sql = `select * from products`;
    try{
        con.query(sql, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get product"})
                throw err;
            }
            else{
                console.log("get products successfull");
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
        res.json({error: "Cannot get products"})
    }
});


// use: GET command with this link http://127.0.0.1:3001/products/2 ahol a 2-es product_id-jű címet akarjuk visszakapni.
router.get('/:product_id', (req, res)=>{
    var sql = `select * from products where id = ?`;
    let product_id = req.params.product_id;
    try{
        con.query(sql, product_id, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get product_id = "+ product_id})
                throw err;
            }
            else{
                if (result.length>0){
                    console.log("get product_id = "+ product_id +" successfull");

                    let rows = [];
                    console.log( result);
                    for(let row of result){
                        rows.push(JSON.parse(JSON.stringify(row)))
                    }
                    res.status(200);
                    res.json(rows);
                }else{
                    res.status(200);
                    result.status = "product not found";
                    result.text = "There is no product with this id = "+ product_id;
                    res.json( result);
                    console.log( JSON.stringify( result));
                }
                
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get product_id = "+ product_id});
    }
})


// use: POST command http://127.0.0.1:3001/products 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy partnerhez több cím is tartozhat.
router.post('/', (req, res)=>{
    var sql = `insert into products (item_number, name, units, `+
    `stock, kg_per_unit, unit_price, vtsz, vat_key,`+
    `vat_exemption_case, vat_exemption_reason, adr_number, `+
    ` created_by) `+
    ` VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    let item_number = req.body.item_number;
    let name = req.body.name;
    let units = req.body.units;
    let stock = req.body.stock;
    let kg_per_unit = req.body.kg_per_unit;
    let unit_price = req.body.unit_price;
    let vtsz = req.body.vtsz;
    let vat_key = req.body.vat_key;
    let vat_exemption_case = req.body.vat_exemption_case;
    let vat_exemption_reason = req.body.vat_exemption_reason;
    let adr_number = req.body.adr_number;
    let created_by = req.body.created_by;
    try{
        con.query(sql, [item_number, name, units, 
            stock, kg_per_unit, unit_price,
            vtsz, vat_key, vat_exemption_case,
            vat_exemption_reason, adr_number,
            created_by], 
            function (err, result) {
                if (err){
                    res.status(500)
                    res.json({error: "Cannot post the new product"})
                    throw err;
                }
                else{
                    res.status(200);
                    console.log( "POST RESULT: ", result);
                    if (result.insertId>0){
                        console.log("post new product successfull. product_id: " + result.insertId );
                        res.json(result);
                    }else{
                        res.status(200);
                        res.json({"status":"error", "text": "The POST product is unsuccessfully", 
                        "product_name": name, 
                        "insertId": result.insertId});
                    }
                }
            }
        );
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get products with this parameters", "product_id": id, "length":0});
    }
})

// use: PUT command http://127.0.0.1:3001/products 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy partnerhez több cím is tartozhat.
// PUT az adat módosítása
router.put('/', (req, res)=>{
    var sql = `replace into products ( id, item_number, name, units, `+
    `stock, kg_per_unit, unit_price, vtsz, vat_key,`+
    `vat_exemption_case, vat_exemption_reason, adr_number, `+
    ` modified, modified_by) `+
    ` VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    let id = req.body.id;
    let item_number = req.body.item_number;
    let name = req.body.name;
    let units = req.body.units;
    let stock = req.body.stock;
    let kg_per_unit = req.body.kg_per_unit;
    let unit_price = req.body.unit_price;
    let vtsz = req.body.vtsz;
    let vat_key = req.body.vat_key;
    let vat_exemption_case = req.body.vat_exemption_case;
    let vat_exemption_reason = req.body.vat_exemption_reason;
    let adr_number = req.body.adr_number;
    let modified = new Date().toISOString();
    let modified_by = req.body.modified_by;
    try{
        con.query(sql, [id, item_number, name, units, 
            stock, kg_per_unit, unit_price,
            vtsz, vat_key, vat_exemption_case,
            vat_exemption_reason, adr_number,
            modified, modified_by], 
            function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot put the product"})
                throw err;
            }
            else{
                console.log( 'PUT RESULT', result);
                if (result.insertId>0){
                    console.log("put product successfull. product_id: " + result.insertId );
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
        res.json({error: "Cannot put product with id", "product_id": id });
    }
});

// use: DELETE command with this link http://127.0.0.1:3001/products/2 ahol a 2-es product_id-jű címet akarjuk törölni.
router.delete('/:product_id', (req, res)=>{
    var sql = `delete from products where id = ?`;
    let product_id = req.params.product_id;
    try{
        con.query( sql, product_id, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Can't delete product_id = "+ product_id})
                throw err;
            }
            else{
                res.status(200);
                if ( result.affectedRows>0){
                    console.log( "product_id = "+ product_id +" successfull deleted");
                    res.status(200);
                    result.status= "OK";
                    result.text_message = "product deleted.";
                    res.json(result);
                }else{
                    result.status= "error";
                    result.text_message = "product not deleted. affectedRows<1 in result.";
                    res.json(result);
                }
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get product_id = "+ product_id});
    }
})



module.exports = router;