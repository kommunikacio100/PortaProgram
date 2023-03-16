
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
    "user_name": "Test User X", "user_password":"TestPwd12!", 
    "user_can_look_data":1, "user_can_edit_data":1, "user_can_weighing":1, 
    "user_can_edit_users":1, "user_can_settings":1 };
// POST new user, update the user, delete user
// létrehozunk egy felhasználót. Ha sikerült, módosítjuk. Ha sikerült a módosítás, akkor töröljük.
fetch( url_users, {
    method: 'POST',
    body: JSON.stringify(new_user_data),
    headers: {
        "Content-type": "application/json; charset = UTF-8",
        "Access-Control-Allow-Origin":"*"
    }})
.then( response => response.json())
.then( json => {
    json["status"] = "OK";
    console.log("POST", json);
    let testDiv = document.getElementById("users_post");
    testDiv.innerHTML = JSON.stringify( json);
    if (json["@new_user_id"]>0){
        // ha létrejött a felhasználó, teszteli a módosítását.
        update_user( json["@new_user_id"]);
    }
});

// Az update_user a felhasználó létrehozásából meghívva, ha sikerült a létrehozás.
const update_user_data = {
    "user_id": 14,
    "user_name": "Test User Y", "user_password":"TestPwd12!", 
    "user_can_look_data":1, "user_can_edit_data":1, "user_can_weighing":1, 
    "user_can_edit_users":1, "user_can_settings":1 };
function update_user( user_id){
    // PUT update the user
    update_user_data["user_id"] = user_id;
    fetch( url_users, {
        method: 'PUT',
        body: JSON.stringify(update_user_data),
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log("PUT", json);
        let testDiv = document.getElementById("users_put");
        testDiv.innerHTML = JSON.stringify( json);

        if (json["@edit_user_id"]>0){
            // ha sikerült a módosítás, teszteli a törlést.
            delete_user( json["@edit_user_id"]);
        }
        return json;
    });
}

// DELETE the user
// Az update_userből van meghívva. 
function delete_user( user_id){
    fetch( url_users+"/"+ user_id, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log("DELETE", json);
        let testDiv = document.getElementById("users_delete");
        testDiv.innerHTML = JSON.stringify( json);
        return json;
    });
}

const new_user_data_hash = {
    "user_name": "Test User X", "user_pwd_hash": "2ef59ea102cfaed847e365526e5c7b0e0ededc8d4e0df45d7e8e959943476477f8ea5719420c4fca9299cebf90e39d2c7568be373aa34e1fc861570dd29b3d5d", 
    "user_can_look_data":1, "user_can_edit_data":1, "user_can_weighing":1, 
    "user_can_edit_users":1, "user_can_settings":1 };
// POST new user, update the user, delete user
// létrehozunk egy felhasználót. Ha sikerült, módosítjuk. Ha sikerült a módosítás, akkor töröljük.
fetch( url_users, {
    method: 'POST',
    body: JSON.stringify(new_user_data_hash),
    headers: {
        "Content-type": "application/json; charset = UTF-8",
        "Access-Control-Allow-Origin":"*"
    }})
.then( response => response.json())
.then( json => {
    json["status"] = "OK";
    console.log("POST", json);
    let testDiv = document.getElementById("users_post_hash");
    testDiv.innerHTML = JSON.stringify( json);
    if (json["@new_user_id"]>0){
        // ha létrejött a felhasználó, teszteli a módosítását.
        update_user( json["@new_user_id"]);
    }
});

