
let url = "http://localhost:3001/";
let url_emails = url+ "emails/";

// GET users
fetch( url_emails).then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("email_list");
    testDiv.innerText = JSON.stringify( json);
});

// GET user ID:1
fetch( url_emails+ "1").then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("email_by_id");
    testDiv.innerHTML = JSON.stringify( json);
});

// GET user to_table and to_ID
fetch( url_emails+ "U&/6").then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("email_by_to_table_and_to_id");
    testDiv.innerHTML = JSON.stringify( json);
});

// GET user to_table and to_ID and default
fetch( url_emails+ "U&/6&/true").then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("email_by_to_table_and_to_id_and_default");
    testDiv.innerHTML = JSON.stringify( json);
});

const new_email_data = {
    "email_to_table": "P", 
    "email_to_id": 1, 
    "email_default": true, 
    "email": "angyal.r@gmail.com", 
    "email_memo": "", 
    "email_created_by": 1
};
// POST new user, update the user, delete user
// létrehozunk egy felhasználót. Ha sikerült, módosítjuk. Ha sikerült a módosítás, akkor töröljük.
fetch( url_emails, {
    method: 'POST',
    body: JSON.stringify(new_email_data),
    headers: {
        "Content-type": "application/json; charset = UTF-8",
        "Access-Control-Allow-Origin":"*"
    }})
.then( response => response.json())
.then( json => {
    json["status"] = "OK";
    console.log("POST", json);
    let testDiv = document.getElementById("email_post");
    testDiv.innerHTML = JSON.stringify( json);
    if (json["insertId"]>0){
        // ha létrejött a cím, teszteli a módosítását.
        update_email( json["insertId"]);
    }
});

const update_email_data = {
    "email_id": 1,
    "email_to_table": "P", 
    "email_to_id": 1, 
    "email_default": true, 
    "email": "angyal.r@gmail.com", 
    "email_memo": "", 
    "email_created_by": 1
};
function update_email( email_id){
    // PUT update the email
    update_email_data["email_id"] = email_id;
    fetch( url_emails, {
        method: 'PUT',
        body: JSON.stringify( update_email_data),
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log("PUT", json);
        let testDiv = document.getElementById("email_put");
        testDiv.innerHTML = JSON.stringify( json);

        if (json["insertId"]>0){
            // ha sikerült a módosítás, teszteli a törlést.
            delete_email( json["insertId"]);
        }
        return json;
    });
}

// DELETE the email
// Az update_email-ből van meghívva. 
function delete_email( email_id){
    fetch( url_emails+"/"+ email_id, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log( "DELETE", json);
        let testDiv = document.getElementById( "email_delete");
        testDiv.innerHTML = JSON.stringify( json);
        return json;
    });
}


// A következő teszt postol három címet, ugyanahhoz a felhasználóhoz.
// Ezután pedig törli a hozzá tartozó összes címet.
const three_new_email_data = [{
    "email_to_table": "U", 
    "email_to_id": 99999999, 
    "email_to_table": "P", 
    "email_to_id": 1, 
    "email_default": true, 
    "email": "angyal.r@gmail.com", 
    "email_memo": "", 
    "email_created_by": 1
},{
    "email_to_table": "U", 
    "email_to_id": 99999999, 
    "email_to_table": "P", 
    "email_to_id": 1, 
    "email_default": true, 
    "email": "angyal.r@gmail.com", 
    "email_memo": "", 
    "email_created_by": 1
},{
    "email_to_table": "U", 
    "email_to_id": 99999999, 
    "email_to_table": "P", 
    "email_to_id": 1, 
    "email_default": true, 
    "email": "angyal.r@gmail.com", 
    "email_memo": "", 
    "email_created_by": 1
}];

async function post_email( email_data){
    return  fetch( url_emails, {
                    method: 'POST',
                    body: JSON.stringify(email_data),
                    headers: {
                        "Content-type": "application/json; charset = UTF-8",
                        "Access-Control-Allow-Origin":"*"
                    }
                })
            .then( response => response.json())
            .catch( error => {console.log("Az url betöltése nem sikerült. ("+ url_emails+")", error)})
            .then( json => {
                    json["status"] = "OK";
                    console.log("POST", json);
                    return( json);
                })
            .catch( error => {console.log("A json konverzió nem sikerült. ("+ url_emails+")", error)});
}

// DELETE emails with to_table and to_id
function delete_emails( email_to_table, addres_to_id){
    fetch( url_emails+"/"+ email_to_table+ "&/"+ addres_to_id, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log( "DELETE", json);
        let testDiv = document.getElementById( "emails_delete");
        testDiv.innerText = JSON.stringify( json);
        return json;
    });
}

const post1 = post_email( three_new_email_data[ 0]);
const post2 = post_email( three_new_email_data[ 1]);
const post3 = post_email( three_new_email_data[ 2]);

if (Promise.all( post1, post2, post3)){
    delete_emails( three_new_email_data[0].email_to_table, three_new_email_data[0].email_to_id);
};




