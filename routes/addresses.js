const express = require("express");
const router = express.Router();
const con = require("../dbConfig");
const crypto = require('crypto');

// use: http://127.0.0.1:3001/addresses ahol az összes címet akarjuk visszakapni.
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


// use: http://127.0.0.1:3001/addresses/2 ahol a 2-es address_id-jű címet akarjuk visszakapni.
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
                    console.log("get address_id = "+ id +" successfull");

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


// use: http://127.0.0.1:3001/addresses/P&/2&/true 
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


// use: http://127.0.0.1:3001/addresses/P&/2 
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

module.exports = router;