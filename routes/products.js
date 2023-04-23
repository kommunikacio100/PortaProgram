const express = require("express");
const router = express.Router();
const con = require("../dbConfig");
const crypto = require('crypto');

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
    var sql = `select * from products where product_id = ?`;
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
    var sql = `insert into products (product_item_number, product_name, product_units, `+
    `product_stock, product_kg_per_unit, product_unit_price, product_vtsz, product_vatKey,`+
    `product_vat_exemption_case, product_vat_exemption_reason, product_adr_number, `+
    ` product_created_by) `+
    ` VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    let product_item_number = req.body.product_item_number;
    let product_name = req.body.product_name;
    let product_units = req.body.product_units;
    let product_stock = req.body.product_stock;
    let product_kg_per_unit = req.body.product_kg_per_unit;
    let product_unit_price = req.body.product_unit_price;
    let product_vtsz = req.body.product_vtsz;
    let product_vatKey = req.body.product_vatKey;
    let product_vat_exemption_case = req.body.product_vat_exemption_case;
    let product_vat_exemption_reason = req.body.product_vat_exemption_reason;
    let product_adr_number = req.body.product_adr_number;
    let product_created_by = req.body.product_created_by;
    try{
        con.query(sql, [product_item_number, product_name, product_units, 
            product_stock, product_kg_per_unit, product_unit_price,
            product_vtsz, product_vatKey, product_vat_exemption_case,
            product_vat_exemption_reason, product_adr_number,
            product_created_by], 
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
                        "product_name": product_name, 
                        "insertId": result.insertId});
                    }
                }
            }
        );
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get products with this parameters", "product_id": product_id, "length":0});
    }
})

// use: PUT command http://127.0.0.1:3001/products 
// a body egy json, ami tartalmazza a szükséges mezőket.
// Egy partnerhez több cím is tartozhat.
// PUT az adat módosítása
router.put('/', (req, res)=>{
    var sql = `replace into products ( product_id, product_item_number, product_name, product_units, `+
    `product_stock, product_kg_per_unit, product_unit_price, product_vtsz, product_vatKey,`+
    `product_vat_exemption_case, product_vat_exemption_reason, product_adr_number, `+
    ` product_modified, product_modified_by) `+
    ` VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    let product_id = req.body.product_id;
    let product_item_number = req.body.product_item_number;
    let product_name = req.body.product_name;
    let product_units = req.body.product_units;
    let product_stock = req.body.product_stock;
    let product_kg_per_unit = req.body.product_kg_per_unit;
    let product_unit_price = req.body.product_unit_price;
    let product_vtsz = req.body.product_vtsz;
    let product_vatKey = req.body.product_vatKey;
    let product_vat_exemption_case = req.body.product_vat_exemption_case;
    let product_vat_exemption_reason = req.body.product_vat_exemption_reason;
    let product_adr_number = req.body.product_adr_number;
    let product_modified = new Date().toISOString();
    let product_modified_by = req.body.product_modified_by;
    try{
        con.query(sql, [product_id,product_item_number, product_name, product_units, 
            product_stock, product_kg_per_unit, product_unit_price,
            product_vtsz, product_vatKey, product_vat_exemption_case,
            product_vat_exemption_reason, product_adr_number,
            product_modified, product_modified_by], 
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
                    result.product_id = product_id;
                    res.json(result);
                }
            }
        });
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot put product with id", "product_id": product_id });
    }
});

// use: DELETE command with this link http://127.0.0.1:3001/products/2 ahol a 2-es product_id-jű címet akarjuk törölni.
router.delete('/:product_id', (req, res)=>{
    var sql = `delete from products where product_id = ?`;
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