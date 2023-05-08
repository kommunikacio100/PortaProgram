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
    var sql =`select * from users where id = ?`;
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
    //console.log( 'POST USERS START...');
    var sql = //`SET @new_user_id = -1; \n`+
              //`SET @text_message = "START SQL COMMAND";\n `+
              `CALL add_user( ?,?,?,?,?,?,?,?, @new_user_id, @text_message);\n`+
              `select @new_user_id, @error_text;\n `;
            
    let user_name = req.body.user_name;
    let user_email = req.body.user_email;
    let user_password = req.body.user_password;
    let user_can_look_data = req.body.user_can_look_data;
    let user_can_edit_data = req.body.user_can_edit_data;
    let user_can_weighing = req.body.user_can_weighing;
    let user_can_edit_users = req.body.user_can_edit_users;
    let user_can_settings = req.body.user_can_settings;
    let user_created_by = req.body.user_created_by;
    try{
        console.log( 'POST USERS SQL START...');
        con.query(sql, [user_name, user_email, user_password, user_can_look_data, user_can_edit_data, 
                user_can_weighing, user_can_edit_users, user_can_settings], function (err, result) {
            if (err){
                console.log( 'POST Query ERROR...');
                res.status(500);
                res.json({error: "Cannot post new user"});
                throw err;
            }
            else{
                console.log( 'POST Query OK...');
                console.log( 'RESULT:', result);
                if (result.length>0){
                    console.log( 'result length = ', result.length);
                    res.status(200);
                    for (let row of result) {
                        if (row.length>0){
                            for (let in_row of row) {
                                console.log( in_row);
                                if ( in_row["@new_user_id"] >0 ){
                                    console.log("post new user successfull. user_id: " + in_row["@new_user_id"]);
                                    in_row["status"]= "OK";
                                    res.json(in_row);
                                }else{
                                    //console.log(  'no id in in_row: ', JSON.stringify(in_row))
                                }
                            }
                        }else{
                            //console.log( 'row');
                            if ( row['@new_user_id'] >0 ){
                                console.log("post new user successfull. user_id: " + row['@new_user_id']);
                                row["status"]= "OK";
                                res.json(row);
                            }else{
                                //console.log(  'no id in row: ', JSON.stringify(row))
                            }
                        }
                    }
                }else{
                    console.log( 'POST Query status length <0...');
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
    console.log( 'POST USERS END...');

});

// use: PUT command http://127.0.0.1:3001/users 
// a body egy json, ami tartalmazza a szükséges mezőket.
router.put('/', (req, res)=>{
    var sql = `SET @text_message= "";\nSET @edit_user_id = -1;\n`+
            `CALL update_user( ?,?,?,?,?,?,?,?,?,@edit_user_id, @text_message);\n`+
            `Select @edit_user_id, @text_message;\n`;
    let user_id = req.body.id;
    let user_name = req.body.name;
    let user_email = req.body.email;
    let user_password = req.body.password;
    let user_can_look_data = req.body.can_look_data;
    let user_can_edit_data = req.body.can_edit_data;
    let user_can_weighing = req.body.can_weighing;
    let user_can_edit_users = req.body.can_edit_users;
    let user_can_settings = req.body.can_settings;
    console.log( req.body);
    console.log( 'user put ', user_id, ' ', user_name, ' ', user_email);
    try{
        con.query( sql, [user_id, user_name, user_email, user_password, user_can_look_data, user_can_edit_data, 
                user_can_weighing, user_can_edit_users, user_can_settings], 
                function (err, result) {
            if (err){
                res.status(500);
                res.json({error: "Cannot put user. user_id: "+ user_id});
                console.log( res);
                throw err;
            }
            else{
                if (result.length>0){
                    console.log( result);
                    res.status(200);
                    for (let row of result) {
                        if (row.length>0){
                            for (let in_row of row) {
                                //console.log( 'in_row');
                                if ( in_row["@edit_user_id"] >0 ){
                                    console.log("user update successfull. user_id: " + in_row["@edit_user_id"]);
                                    in_row["status"]= "OK";
                                    res.json(in_row);
                                }else{
                                    //console.log(  'no id in in_row: ', JSON.stringify(in_row))
                                }
                            }
                        }else{
                            //console.log( 'row');
                            if ( row['@edit_user_id'] >0 ){
                                console.log("user update successfull. user_id: " + row['@edit_user_id']);
                                row["status"]= "OK";
                                res.json(row);
                            }else{
                                //console.log(  'no id in row: ', JSON.stringify(row))
                            }
                        }
                    }
                }else{
                    res.status(200);
                    res.json({
                        "status":"error", 
                        "text": "Can't update user.", 
                        "user_id": user_id, 
                        "length": 0
                    });
                    console.log( res);
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
        con.query(sql, [user_id], function (err, result) {
            if (err){
                res.status(500)
                res.json({ status: "error", error_text: "Cannot delete user_id = "+ user_id,
                    "err": err});
                throw err;
            }
            else{
                if (result != null){
                    console.log("delete user_id = "+ user_id +" successfull");
                    res.status(200);
                    result["user_id"] = user_id;
                    res.json(result);
                }else{
                    res.status(200);
                    res.json({"status":"error", "text": "There is no user with this id = "+ user_id, "length":0});
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