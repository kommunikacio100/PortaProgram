
let url = "http://localhost:3001/";
let url_adresses = url+ "adresses/";
let url_users = url + "users/";

// GET users
fetch( url_users).then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("users");
    testDiv.innerHTML = JSON.stringify( json);
});

// GET user ID:1
fetch( url_users+ "1").then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("users_1");
    testDiv.innerHTML = JSON.stringify( json);
});

const new_user_data = {
    "user_name": "Test User X", "user_password":"TestPwd!", 
    "user_can_look_data":1, "user_can_edit_data":1, "user_can_weighing":1, 
    "user_can_edit_users":1, "user_can_settings":1 };
var new_user_id = 0;
// POST new user, update the user, delete user
fetch( url_users, {
    method: 'POST',
    body: JSON.stringify(new_user_data),
    headers: {
        "Content-type": "application/json; charset = UTF-8",
        "Access-Control-Allow-Origin":"*"
    }})
.then( response => response.json())
.then( json => {
    console.log("POST", json);
    new_user_id= json.new_user_id;
    let testDiv = document.getElementById("post");
    testDiv.innerHTML = JSON.stringify( json);
    if (new_user_id>0) {
        testDiv.innerHTML.concat( "\nID OK:"+ new_user_id);
        // fetch( url_users+ new_user_id, {    
        //     method: 'DELETE',
        // }).then( 

        // ).then( )

        // fetch( url_users+ new_user_id, {    
        //     method: 'DELETE',
    }
});

