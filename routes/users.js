const express = require("express");
const router = express.Router();
const con = require("../dbConfig");
const crypto = require('crypto');

router.get('/', (req, res)=>{
    var sql = `select * from users`;
    try{
        con.query(sql, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get users"})
                throw err;
            }
            else{
                console.log("get users successfull");
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
        res.json({error: "Cannot get users"})
    }
});

// use: GET command with this link http://127.0.0.1:3001/users/2 ahol a 2-es address_id-jű usert akarjuk visszakapni.
router.get('/:user_id', (req, res)=>{
    var sql = `select * from users where user_id = ?`;
    let user_id = req.params.user_id;
    try{
        con.query(sql, user_id, function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot get user_id = "+ user_id})
                throw err;
            }
            else{
                if (result.length>0){
                    console.log("get user_id = "+ user_id +" successfull");

                    res.status(200);
                    res.json(result[0]);
                }else{
                    res.status(200);
                    res.json({"status":"No user", "text": "There is no address with this id = "+ user_id, "length":0});
                }
                
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot get user_id = "+ user_id});
    }
})

// use: POST command http://127.0.0.1:3001/users 
// a body egy json, ami tartalmazza a szükséges mezőket.
router.post('/', (req, res)=>{
    var sql = `CALL add_user( ?,?,?,?,?,?,?,?,?) `;
    let user_name = req.body.user_name;
    let user_password = req.body.user_password;
    let user_can_look_data = req.body.user_can_look_data;
    let user_can_edit_data = req.body.user_can_edit_data;
    let user_can_weighing = req.body.user_can_weighing;
    let user_can_edit_users = req.body.user_can_edit_users;
    let user_can_settings = req.body.user_can_settings;
    let user_created_by = req.body.user_created_by;
    //var new_user_id;
    //var error_text;
    try{
        con.query(sql, [user_name, user_password, user_can_look_data, user_can_edit_data, 
                user_can_weighing, user_can_edit_users, user_can_settings, 
                new_user_id, error_text], function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot post new user"})
                throw err;
            }
            else{
                if (result.length>0){
                    console.log("post new user successfull. user_id: " + result.new_user_id );
                    console.log( result);
                    res.status(200);
                    res.json(result[0]);
                }else{
                    res.status(200);
                    res.json({"status":"error", "text": "Can't create new user.", 
                    "user_name": user_name, 
                    "length": 0});
                }
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({
            "status": "error", 
            "text": "Can't create new user.", 
            "user_name": user_name, 
            "length": -1});
    }
});

// use: POST command http://127.0.0.1:3001/users 
// a body egy json, ami tartalmazza a szükséges mezőket.
router.put('/', (req, res)=>{
    var sql = `CALL update_user( ?,?,?,?,?,?,?,?,?,?) `;
    let user_id = req.body.user_id;
    let user_name = req.body.user_name;
    let user_password = req.body.user_password;
    let user_can_look_data = req.body.user_can_look_data;
    let user_can_edit_data = req.body.user_can_edit_data;
    let user_can_weighing = req.body.user_can_weighing;
    let user_can_edit_users = req.body.user_can_edit_users;
    let user_can_settings = req.body.user_can_settings;
    let user_created_by = req.body.user_created_by;
    var new_user_id;
    var error_text;
    try{
        con.query(sql, [user_id, user_name, user_password, user_can_look_data, user_can_edit_data, 
                user_can_weighing, user_can_edit_users, user_can_settings, 
                new_user_id, error_text], function (err, result) {
            if (err){
                res.status(500)
                res.json({error: "Cannot post new user"})
                throw err;
            }
            else{
                if (result.length>0){
                    console.log("post new user successfull. user_id: " + result.new_user_id );
                    console.log( result);
                    res.status(200);
                    res.json(result[0]);
                }else{
                    res.status(200);
                    res.json({"status":"error", "text": "Can't create new user.", 
                    "user_name": user_name, 
                    "length": 0});
                }
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({
            "status": "error", 
            "text": "Can't create new user.", 
            "user_name": user_name, 
            "length": -1});
    }
});

router.delete('/:user_id', (req, res) => {
    var sql = `delete from users where user_id = ?`;
    let user_id = req.params.user_id;
    try{
        con.query(sql, user_id, function (err, result) {
            if (err){
                res.status(500)
                res.json({ status: "error", error_text: "Cannot delete user_id = "+ user_id,
                    "err": err});
                throw err;
            }
            else{
                if (result.length>0){
                    console.log("delete user_id = "+ user_id +" successfull");

                    res.status(200);
                    res.json(result);
                }else{
                    res.status(200);
                    res.json({"status":"No user", "text": "There is no user with this id = "+ user_id, "length":0});
                }
                
            }
        });
        
    }catch(e){
        console.error(e);
        res.status(500);
        res.json({error: "Cannot delete user_id = "+ user_id});
    }
  })

module.exports = router;