
let url = "http://localhost:3001/";
let url_addresses = url+ "addresses/";

// GET users
fetch( url_addresses).then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("address_list");
    testDiv.innerText = JSON.stringify( json);
});

// GET user ID:1
fetch( url_addresses+ "1").then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("address_by_id");
    testDiv.innerHTML = JSON.stringify( json);
});

// GET user to_table and to_ID
fetch( url_addresses+ "U&/2").then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("address_by_to_table_and_to_id");
    testDiv.innerHTML = JSON.stringify( json);
});

// GET user to_table and to_ID and default
fetch( url_addresses+ "U&/2&/true").then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("address_by_to_table_and_to_id_and_default");
    testDiv.innerHTML = JSON.stringify( json);
});

const new_address_data = {
    "address_to_table": "P", 
    "address_to_id": 1, 
    "default_address": true, 
    "country_code": "HU", 
    "zip_code": "7631", 
    "city": "Pécs", 
    "street_name": "Zsolnay Vilmos", 
    "street_type": "út", 
    "street_number": "1", 
    "lot_number": "", 
    "gps_latitude": "", 
    "gps_longitude": "", 
    "address_created_by": 1
};
// POST new user, update the user, delete user
// létrehozunk egy felhasználót. Ha sikerült, módosítjuk. Ha sikerült a módosítás, akkor töröljük.
fetch( url_addresses, {
    method: 'POST',
    body: JSON.stringify(new_address_data),
    headers: {
        "Content-type": "application/json; charset = UTF-8",
        "Access-Control-Allow-Origin":"*"
    }})
.then( response => response.json())
.then( json => {
    json["status"] = "OK";
    console.log("POST", json);
    let testDiv = document.getElementById("address_post");
    testDiv.innerHTML = JSON.stringify( json);
    if (json["insertId"]>0){
        // ha létrejött a cím, teszteli a módosítását.
        update_address( json["insertId"]);
    }
});

const update_address_data = {
    "address_id": 1,
    "address_to_table": "P", 
    "address_to_id": 1, 
    "default_address": true, 
    "country_code":"HU", 
    "zip_code": "7631", 
    "city": "Pécs", 
    "street_name": "Láncz", 
    "street_type": "utca", 
    "street_number": "1", 
    "lot_number": "", 
    "gps_latitude": "", 
    "gps_longitude": "", 
    "address_created_by": 1
};
function update_address( address_id){
    // PUT update the address
    update_address_data["address_id"] = address_id;
    fetch( url_addresses, {
        method: 'PUT',
        body: JSON.stringify( update_address_data),
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log("PUT", json);
        let testDiv = document.getElementById("address_put");
        testDiv.innerHTML = JSON.stringify( json);

        if (json["insertId"]>0){
            // ha sikerült a módosítás, teszteli a törlést.
            delete_address( json["insertId"]);
        }
        return json;
    });
}

// DELETE the address
// Az update_address-ből van meghívva. 
function delete_address( address_id){
    fetch( url_addresses+"/"+ address_id, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log( "DELETE", json);
        let testDiv = document.getElementById( "address_delete");
        testDiv.innerHTML = JSON.stringify( json);
        return json;
    });
}


// A következő teszt postol három címet, ugyanahhoz a felhasználóhoz.
// Ezután pedig törli a hozzá tartozó összes címet.
const three_new_address_data = [{
    "address_to_table": "U", 
    "address_to_id": 99999999, 
    "default_address": true, 
    "country_code": "HU", 
    "zip_code": "7631", 
    "city": "Pécs", 
    "street_name": "Zsolnay Vilmos", 
    "street_type": "út", 
    "street_number": "1", 
    "lot_number": "", 
    "gps_latitude": "", 
    "gps_longitude": "", 
    "address_created_by": 1
},{
    "address_to_table": "U", 
    "address_to_id": 99999999, 
    "default_address": true, 
    "country_code": "HU", 
    "zip_code": "6801", 
    "city": "Baja", 
    "street_name": "Zsolnay Vilmos", 
    "street_type": "út", 
    "street_number": "1", 
    "lot_number": "", 
    "gps_latitude": "", 
    "gps_longitude": "", 
    "address_created_by": 1
},{
    "address_to_table": "U", 
    "address_to_id": 99999999, 
    "default_address": true, 
    "country_code": "HU", 
    "zip_code": "77777777", 
    "city": "Zulu", 
    "street_name": "Zsolnay Vilmos", 
    "street_type": "út", 
    "street_number": "1", 
    "lot_number": "", 
    "gps_latitude": "", 
    "gps_longitude": "", 
    "address_created_by": 1
}];

async function post_address( address_data){
    return  fetch( url_addresses, {
                    method: 'POST',
                    body: JSON.stringify(address_data),
                    headers: {
                        "Content-type": "application/json; charset = UTF-8",
                        "Access-Control-Allow-Origin":"*"
                    }
                })
            .then( response => response.json())
            .catch( error => {console.log("Az url betöltése nem sikerült. ("+ url_addresses+")", error)})
            .then( json => {
                    json["status"] = "OK";
                    console.log("POST", json);
                    return( json);
                })
            .catch( error => {console.log("A json konverzió nem sikerült. ("+ url_addresses+")", error)});
}

// DELETE addresses with to_table and to_id
function delete_addresses( address_to_table, addres_to_id){
    fetch( url_addresses+"/"+ address_to_table+ "&/"+ addres_to_id, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log( "DELETE", json);
        let testDiv = document.getElementById( "addresses_delete");
        testDiv.innerText = JSON.stringify( json);
        return json;
    });
}

const post1 = post_address( three_new_address_data[ 0]);
const post2 = post_address( three_new_address_data[ 1]);
const post3 = post_address( three_new_address_data[ 2]);

if (Promise.all( post1, post2, post3)){
    delete_addresses( three_new_address_data[0].address_to_table, three_new_address_data[0].address_to_id);
};




