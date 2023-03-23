
let url = "http://localhost:3001/";
let url_measurements = url+ "measurements/";

// GET users
fetch( url_measurements).then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("measurement_list");
    testDiv.innerText = JSON.stringify( json);
});

// GET measurement ID:1
fetch( url_measurements+ "1").then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("measurement_by_id");
    testDiv.innerHTML = JSON.stringify( json);
});


// GET measurements for a delivery_note ID:1
fetch( url_measurements+ "D&/1").then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("measurements_for_delivery_note_id");
    testDiv.innerHTML = JSON.stringify( json);
});


// POST new measurement, update the measurement, delete measurement
// létrehozunk egy mérlegelést. Ha sikerült, módosítjuk. Ha sikerült a módosítás, akkor töröljük.
const new_measurement_data = {
    "measurement_delivery_note_id":"1", 
    "delivery_note_vehicle_id":"1",     
    "measurement_product_id":"1", 
    "measurement_first_weight":"1", 
    "measurement_second_weight":"1", 
    "measurement_first_time":"1", 
    "measurement_second_time":"1", 
    "measurement_net_weight":"1", 
    "measurement_first_type":"1", 
    "measurement_second_type":"1", 
    "measurement_created_by":"1" 
};
fetch( url_measurements, {
    method: 'POST',
    body: JSON.stringify(new_measurement_data),
    headers: {
        "Content-type": "application/json; charset = UTF-8",
        "Access-Control-Allow-Origin":"*"
    }})
.then( response => response.json())
.then( json => {
    json["status"] = "OK";
    console.log("POST", json);
    let testDiv = document.getElementById("measurement_post");
    testDiv.innerHTML = JSON.stringify( json);
    if (json["insertId"]>0){
        // ha létrejött a cím, teszteli a módosítását.
        update_measurement( json["insertId"]);
    }
});

const update_measurement_data = {
    "measurement_id":"1", 
    "measurement_delivery_note_id":"2", 
    "delivery_note_vehicle_id":"2",     
    "measurement_product_id":"2", 
    "measurement_first_weight":"10000", 
    "measurement_second_weight":"20000", 
    "measurement_first_time":"2023-03-20 12:30", 
    "measurement_second_time":"2023-03-20 12:50", 
    "measurement_net_weight":"10000", 
    "measurement_first_type":"1", 
    "measurement_second_type":"1", 
    "measurement_modified_by":"1"
};
function update_measurement( measurement_id){
    // PUT update the measurement
    update_measurement_data["measurement_id"] = measurement_id;
    fetch( url_measurements, {
        method: 'PUT',
        body: JSON.stringify( update_measurement_data),
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log("PUT", json);
        let testDiv = document.getElementById("measurement_put");
        testDiv.innerHTML = JSON.stringify( json);

        if (json["insertId"]>0){
            // ha sikerült a módosítás, teszteli a törlést.
            delete_measurement( json["insertId"]);
        }
        return json;
    });
}

// DELETE the measurement
// Az update_measurement-ből van meghívva. 
function delete_measurement( measurement_id){
    fetch( url_measurements+"/"+ measurement_id, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log( "DELETE", json);
        let testDiv = document.getElementById( "measurement_delete");
        testDiv.innerHTML = JSON.stringify( json);
        return json;
    });
}


