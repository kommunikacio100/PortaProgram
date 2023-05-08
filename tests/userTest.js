
let url = "http://localhost:3001/";
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
    "name": "Test User X", "email": "test@user.hu", "password":"TestPwd12!", 
    "can_look_data":1, "can_edit_data":1, "user_can_weighing":1, 
    "can_edit_users":1, "can_settings":1 };
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

const update_user_data = {
    "id": 14,
    "name": "Test User Y", "password":"TestPwd12!", 
    "can_look_data":1, "can_edit_data":1, "can_weighing":1, 
    "can_edit_users":1, "can_settings":1 };
function update_user( user_id){
// PUT update the user
    update_user_data["id"] = user_id;
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

