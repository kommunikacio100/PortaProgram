
let url = "http://localhost:3001/";
let url_carriers = url+ "carriers/";

// GET users
fetch( url_carriers).then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("carrier_list");
    testDiv.innerText = JSON.stringify( json);
});

// GET user ID:1
fetch( url_carriers+ "1").then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("carrier_by_id");
    testDiv.innerHTML = JSON.stringify( json);
});


// POST new carrier, update the carrier, delete carrier
// létrehozunk egy szállítót. Ha sikerült, módosítjuk. Ha sikerült a módosítás, akkor töröljük.
const new_carrier_data = {
    "carrier_ekaerid": "", 
    "carrier_name": "Tranportation Ltd.", 
    "carrier_memo": "Only 40t", 
    "carrier_created_by": 1
};
fetch( url_carriers, {
    method: 'POST',
    body: JSON.stringify(new_carrier_data),
    headers: {
        "Content-type": "application/json; charset = UTF-8",
        "Access-Control-Allow-Origin":"*"
    }})
.then( response => response.json())
.then( json => {
    json["status"] = "OK";
    console.log("POST", json);
    let testDiv = document.getElementById("carrier_post");
    testDiv.innerHTML = JSON.stringify( json);
    if (json["insertId"]>0){
        // ha létrejött a cím, teszteli a módosítását.
        update_carrier( json["insertId"]);
    }
});

const update_carrier_data = {
    "carrier_id": 1, 
    "carrier_ekaerid": "", 
    "carrier_name": "Tranportation Ltd.", 
    "carrier_memo": "Only 40t", 
    "carrier_created_by": 1
};
function update_carrier( carrier_id){
    // PUT update the carrier
    update_carrier_data["carrier_id"] = carrier_id;
    fetch( url_carriers, {
        method: 'PUT',
        body: JSON.stringify( update_carrier_data),
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log("PUT", json);
        let testDiv = document.getElementById("carrier_put");
        testDiv.innerHTML = JSON.stringify( json);

        if (json["insertId"]>0){
            // ha sikerült a módosítás, teszteli a törlést.
            delete_carrier( json["insertId"]);
        }
        return json;
    });
}

// DELETE the carrier
// Az update_carrier-ből van meghívva. 
function delete_carrier( carrier_id){
    fetch( url_carriers+"/"+ carrier_id, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log( "DELETE", json);
        let testDiv = document.getElementById( "carrier_delete");
        testDiv.innerHTML = JSON.stringify( json);
        return json;
    });
}


