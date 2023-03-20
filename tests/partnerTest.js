
let url = "http://localhost:3001/";
let url_partners = url+ "partners/";

// GET users
fetch( url_partners).then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("partner_list");
    testDiv.innerText = JSON.stringify( json);
});

// GET user ID:1
fetch( url_partners+ "3").then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("partner_by_id");
    testDiv.innerHTML = JSON.stringify( json);
});


// POST new partner, update the partner, delete partner
// létrehozunk egy szállítót. Ha sikerült, módosítjuk. Ha sikerült a módosítás, akkor töröljük.
const new_partner_data = {
    "partner_ekaerid": "", 
    "partner_name": "Tranportation Ltd.", 
    "partner_memo": "Only 40t", 
    "partner_created_by": 1
};
fetch( url_partners, {
    method: 'POST',
    body: JSON.stringify(new_partner_data),
    headers: {
        "Content-type": "application/json; charset = UTF-8",
        "Access-Control-Allow-Origin":"*"
    }})
.then( response => response.json())
.then( json => {
    json["status"] = "OK";
    console.log("POST", json);
    let testDiv = document.getElementById("partner_post");
    testDiv.innerHTML = JSON.stringify( json);
    if (json["insertId"]>0){
        // ha létrejött a cím, teszteli a módosítását.
        update_partner( json["insertId"]);
    }
});

const update_partner_data = {
    "partner_id": 1, 
    "partner_ekaerid": "", 
    "partner_name": "Tranportation Ltd.", 
    "partner_memo": "Only 40t", 
    "partner_created_by": 1
};
function update_partner( partner_id){
    // PUT update the partner
    update_partner_data["partner_id"] = partner_id;
    fetch( url_partners, {
        method: 'PUT',
        body: JSON.stringify( update_partner_data),
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log("PUT", json);
        let testDiv = document.getElementById("partner_put");
        testDiv.innerHTML = JSON.stringify( json);

        if (json["insertId"]>0){
            // ha sikerült a módosítás, teszteli a törlést.
            delete_partner( json["insertId"]);
        }
        return json;
    });
}

// DELETE the partner
// Az update_partner-ből van meghívva. 
function delete_partner( partner_id){
    fetch( url_partners+"/"+ partner_id, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log( "DELETE", json);
        let testDiv = document.getElementById( "partner_delete");
        testDiv.innerHTML = JSON.stringify( json);
        return json;
    });
}


