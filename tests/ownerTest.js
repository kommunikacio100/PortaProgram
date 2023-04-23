
let url = "http://localhost:3001/";
let url_owners = url+ "owners/";

// GET users
fetch( url_owners).then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("owner_list");
    testDiv.innerText = JSON.stringify( json);
});

// GET user ID:1
fetch( url_owners+ "5").then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("owner_by_id");
    testDiv.innerHTML = JSON.stringify( json);
});


// POST new owner, update the owner, delete owner
// létrehozunk egy szállítót. Ha sikerült, módosítjuk. Ha sikerült a módosítás, akkor töröljük.
const new_owner_data = {
    "owner_ekaerid": "", 
    "owner_name": "Tranportation Ltd.", 
    "owner_memo": "Only 40t", 
    "owner_created_by": 1
};
fetch( url_owners, {
    method: 'POST',
    body: JSON.stringify(new_owner_data),
    headers: {
        "Content-type": "application/json; charset = UTF-8",
        "Access-Control-Allow-Origin":"*"
    }})
.then( response => response.json())
.then( json => {
    json["status"] = "OK";
    console.log("POST", json);
    let testDiv = document.getElementById("owner_post");
    testDiv.innerHTML = JSON.stringify( json);
    if (json["insertId"]>0){
        // ha létrejött a cím, teszteli a módosítását.
        update_owner( json["insertId"]);
    }
});

const update_owner_data = {
    "owner_id": 1, 
    "owner_ekaerid": "", 
    "owner_name": "Tranportation Ltd.", 
    "owner_memo": "Only 40t", 
    "owner_created_by": 1
};
function update_owner( owner_id){
    // PUT update the owner
    update_owner_data["owner_id"] = owner_id;
    fetch( url_owners, {
        method: 'PUT',
        body: JSON.stringify( update_owner_data),
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log("PUT", json);
        let testDiv = document.getElementById("owner_put");
        testDiv.innerHTML = JSON.stringify( json);

        if (json["insertId"]>0){
            // ha sikerült a módosítás, teszteli a törlést.
            delete_owner( json["insertId"]);
        }
        return json;
    });
}

// DELETE the owner
// Az update_owner-ből van meghívva. 
function delete_owner( owner_id){
    fetch( url_owners+"/"+ owner_id, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log( "DELETE", json);
        let testDiv = document.getElementById( "owner_delete");
        testDiv.innerHTML = JSON.stringify( json);
        return json;
    });
}


