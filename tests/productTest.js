
let url = "http://localhost:3001/";
let url_products = url+ "products/";

// GET products
fetch( url_products).then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("product_list");
    testDiv.innerText = JSON.stringify( json);
});

// GET product ID:1
fetch( url_products+ "3").then( (response)=>{
    return response.json();
}).
then( (json) => {
    let testDiv = document.getElementById("product_by_id");
    testDiv.innerHTML = JSON.stringify( json);
});


// POST new product, update the product, delete product
// létrehozunk egy szállítót. Ha sikerült, módosítjuk. Ha sikerült a módosítás, akkor töröljük.
const new_product_data = {
    "product_item_number": "OK4-16", 
    "product_name": "Osztályozott kavics 4-16 mm", 
    "product_units": "m3", 
    "product_stock": 0.0, 
    "product_kg_per_unit": 1000, 
    "product_unit_price": 6800, 
    "product_vtsz": "1011011", 
    "product_vatKey": 27, 
    "product_vat_exemption_case": "", 
    "product_vat_exemption_reason": "", 
    "product_adr_number": "", 
    "product_created_by": 1
};
fetch( url_products, {
    method: 'POST',
    body: JSON.stringify(new_product_data),
    headers: {
        "Content-type": "application/json; charset = UTF-8",
        "Access-Control-Allow-Origin":"*"
    }})
.then( response => response.json())
.then( json => {
    json["status"] = "OK";
    console.log("POST", json);
    let testDiv = document.getElementById("product_post");
    testDiv.innerHTML = JSON.stringify( json);
    if (json["insertId"]>0){
        // ha létrejött a cím, teszteli a módosítását.
        update_product( json["insertId"]);
    }
});

const update_product_data = {
    "product_id": 1, 
    "product_item_number": "OK4-24", 
    "product_name": "Osztályozott kavics 4-24 mm", 
    "product_units": "m3", 
    "product_stock": 230.0, 
    "product_kg_per_unit": 1000, 
    "product_unit_price": 6800, 
    "product_vtsz": "1011011", 
    "product_vatKey": 27, 
    "product_vat_exemption_case": "", 
    "product_vat_exemption_reason": "", 
    "product_adr_number": "", 
    "product_created_by": 1
};
function update_product( product_id){
    // PUT update the product
    update_product_data["product_id"] = product_id;
    fetch( url_products, {
        method: 'PUT',
        body: JSON.stringify( update_product_data),
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log("PUT", json);
        let testDiv = document.getElementById("product_put");
        testDiv.innerHTML = JSON.stringify( json);

        if (json["insertId"]>0){
            // ha sikerült a módosítás, teszteli a törlést.
            delete_product( json["insertId"]);
        }
        return json;
    });
}

// DELETE the product
// Az update_product-ből van meghívva. 
function delete_product( product_id){
    fetch( url_products+"/"+ product_id, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset = UTF-8",
            "Access-Control-Allow-Origin":"*"
        }})
    .then( response => response.json())
    .then( json => {
        json["status"] = "OK";
        console.log( "DELETE", json);
        let testDiv = document.getElementById( "product_delete");
        testDiv.innerHTML = JSON.stringify( json);
        return json;
    });
}


