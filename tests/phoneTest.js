
let url = "http://localhost:3001/";
let url_phones = url+ "phones/";

// GET users
fetch( url_phones).then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("phone_list");
    testDiv.innerText = JSON.stringify( json);
});

// GET user ID:1
fetch( url_phones+ "7").then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("phone_by_id");
    testDiv.innerHTML = JSON.stringify( json);
});

// GET user to_table and to_ID
fetch( url_phones+ "U&/7").then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("phone_by_to_table_and_to_id");
    testDiv.innerHTML = JSON.stringify( json);
});

// GET user to_table and to_ID and default
fetch( url_phones+ "U&/7&/true").then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("phone_by_to_table_and_to_id_and_default");
    testDiv.innerHTML = JSON.stringify( json);
});

const new_phone_data = {
    "phone_to_table": "P", 
    "phone_to_id": 1, 
    "phone": '+3672525183',
    "phone_memo": "no contract to memo.",
    "phone_default": true, 
    "phone_created_by": 1
};
// POST new user, update the user, delete user
// létrehozunk egy felhasználót. Ha sikerült, módosítjuk. Ha sikerült a módosítás, akkor töröljük.
fetch( url_phones, {
    method: 'POST',
    body: JSON.stringify(new_phone_data),
    headers: {
        "Content-type": "application/json; charset = UTF-8",
        "Access-Control-Allow-Origin":"*"
    }})
.then( response => response.json())
.then( json => {
    json["status"] = "OK";
    console.log("POST", json);
    let testDiv = document.getElementById("phone_post");
    testDiv.innerHTML = JSON.stringify( json);
    if (json["insertId"]>0){
        // ha létrejött a cím, teszteli a módosítását.
        update_phone( json["insertId"]);
    }
});

const update_phone_data = {
    "phone_id": 1,
    "phone_to_table": "P", 
    "phone_to_id": 1, 
    "phone": '+3672525189',
    "phone_memo": "no contract to append.",
    "phone_default": true, 
    "phone_created_by": 1
};
function update_phone( phone_id){
    // PUT update the phone
    update_phone_data["phone_id"] = phone_id;
    fetch( url_phones, {
        method: 'PUT',
        body: JSON.stringify( update_phone_data),
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log("PUT", json);
        let testDiv = document.getElementById("phone_put");
        testDiv.innerHTML = JSON.stringify( json);

        if (json["insertId"]>0){
            // ha sikerült a módosítás, teszteli a törlést.
            delete_phone( json["insertId"]);
        }
        return json;
    });
}

// DELETE the phone
// Az update_phone-ből van meghívva. 
function delete_phone( phone_id){
    fetch( url_phones+"/"+ phone_id, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log( "DELETE", json);
        let testDiv = document.getElementById( "phone_delete");
        testDiv.innerHTML = JSON.stringify( json);
        return json;
    });
}


// A következő teszt postol három címet, ugyanahhoz a felhasználóhoz.
// Ezután pedig törli a hozzá tartozó összes címet.
const three_new_phone_data = [{
    "phone_to_table": "U", 
    "phone_to_id": 99999999, 
    "phone": '+3672525181',
    "phone_memo": "no contract to memo.",
    "phone_default": true, 
    "phone_created_by": 1
},{
    "phone_to_table": "U", 
    "phone_to_id": 99999999, 
    "phone": '+3672525182',
    "phone_memo": "no contract to memo.",
    "phone_default": true, 
    "phone_created_by": 1
},{
    "phone_to_table": "U", 
    "phone_to_id": 99999999, 
    "phone": '+3672525183',
    "phone_memo": "no contract to memo.",
    "phone_default": true, 
    "phone_created_by": 1
}];

async function post_phone( phone_data){
    return  fetch( url_phones, {
                    method: 'POST',
                    body: JSON.stringify(phone_data),
                    headers: {
                        "Content-type": "application/json; charset = UTF-8",
                        "Access-Control-Allow-Origin":"*"
                    }
                })
            .then( response => response.json())
            .catch( error => {console.log("Az url betöltése nem sikerült. ("+ url_phones+")", error)})
            .then( json => {
                    json["status"] = "OK";
                    console.log("POST", json);
                    return( json);
                })
            .catch( error => {console.log("A json konverzió nem sikerült. ("+ url_phones+")", error)});
}

// DELETE phones with to_table and to_id
function delete_phones( phone_to_table, addres_to_id){
    fetch( url_phones+"/"+ phone_to_table+ "&/"+ addres_to_id, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log( "DELETE", json);
        let testDiv = document.getElementById( "phones_delete");
        testDiv.innerText = JSON.stringify( json);
        return json;
    });
}

const post1 = post_phone( three_new_phone_data[ 0]);
const post2 = post_phone( three_new_phone_data[ 1]);
const post3 = post_phone( three_new_phone_data[ 2]);

if (Promise.all( post1, post2, post3)){
    delete_phones( three_new_phone_data[0].phone_to_table, three_new_phone_data[0].phone_to_id);
};




