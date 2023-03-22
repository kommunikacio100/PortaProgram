
let url = "http://localhost:3001/";
let url_delivery_notes = url+ "delivery_notes/";

// GET delivery_notes
fetch( url_delivery_notes).then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("delivery_note_list");
    testDiv.innerText = JSON.stringify( json);
});

// GET user ID:1
fetch( url_delivery_notes+ "1").then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("delivery_note_by_id");
    testDiv.innerHTML = JSON.stringify( json);
});


// POST new delivery_note, update the delivery_note, delete delivery_note
// létrehozunk egy szállítót. Ha sikerült, módosítjuk. Ha sikerült a módosítás, akkor töröljük.
const new_delivery_note_data = {
    "delivery_note_serial_no":"SN/2023/000001", 
    "delivery_note_owner_id":"1", 
    "delivery_note_owner_address_id":"1", 
    "delivery_note_loadlocation_address_id":"1", 
    "delivery_note_partner_id":"1", 
    "delivery_note_partner_address_id":"1", 
    "delivery_note_unloadlocation_address_id":"1", 
    "delivery_note_carrier_id":"1", 
    "delivery_note_carrier_address_id":"1", 
    "delivery_note_movement_id":"1", 
     "delivery_note_created_by": 1
};
fetch( url_delivery_notes, {
    method: 'POST',
    body: JSON.stringify(new_delivery_note_data),
    headers: {
        "Content-type": "application/json; charset = UTF-8",
        "Access-Control-Allow-Origin":"*"
    }})
.then( response => response.json())
.then( json => {
    json["status"] = "OK";
    console.log("POST", json);
    let testDiv = document.getElementById("delivery_note_post");
    testDiv.innerHTML = JSON.stringify( json);
    if (json["insertId"]>0){
        // ha létrejött a cím, teszteli a módosítását.
        update_delivery_note( json["insertId"]);
    }
});

const update_delivery_note_data = {
    "delivery_note_id": 1, 
    "delivery_note_serial_no":"SN/2023/000001", 
    "delivery_note_owner_id":"2", 
    "delivery_note_owner_address_id":"2", 
    "delivery_note_loadlocation_address_id":"2", 
    "delivery_note_partner_id":"2", 
    "delivery_note_partner_address_id":"1", 
    "delivery_note_unloadlocation_address_id":"1", 
    "delivery_note_carrier_id":"1", 
    "delivery_note_carrier_address_id":"1", 
    "delivery_note_movement_id":"1", 
    "delivery_note_modified_by": 1
};
function update_delivery_note( delivery_note_id){
    // PUT update the delivery_note
    update_delivery_note_data["delivery_note_id"] = delivery_note_id;
    fetch( url_delivery_notes, {
        method: 'PUT',
        body: JSON.stringify( update_delivery_note_data),
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log("PUT", json);
        let testDiv = document.getElementById("delivery_note_put");
        testDiv.innerHTML = JSON.stringify( json);

        if (json["insertId"]>0){
            // ha sikerült a módosítás, teszteli a törlést.
            delete_delivery_note( json["insertId"]);
        }
        return json;
    });
}

// DELETE the delivery_note
// Az update_delivery_note-ből van meghívva. 
function delete_delivery_note( delivery_note_id){
    fetch( url_delivery_notes+"/"+ delivery_note_id, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log( "DELETE", json);
        let testDiv = document.getElementById( "delivery_note_delete");
        testDiv.innerHTML = JSON.stringify( json);
        return json;
    });
}


