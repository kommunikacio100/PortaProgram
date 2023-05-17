
import { authToken, serverUrl, requestOptions } from './requestOptions.js';

const cached_product_id = localStorage.getItem('product_id');

if (cached_product_id) {
    fetch( serverUrl+ '/products/'+ cached_product_id, requestOptions)
    .then(response => response.json())
    .then( datas => {
        // console.log(datas);
        datas.map( data => {
            // console.log(data);
            document.getElementById('item_number').value = data.item_number;
            document.getElementById('name').value = data.name;
            document.getElementById('units').value = data.units;
            document.getElementById('unit_price').value = data.unit_price;
            document.getElementById('stock').value = data.stock;
            document.getElementById('kg_per_unit').value = data.kg_per_unit;
            document.getElementById('vat_key').value = data.vat_key;
            document.getElementById('id').value = data.id;
        })
    })
    localStorage.removeItem("product_id");
}

const submit_button_product = document.getElementById("submit_button");

submit_button_product.addEventListener("click", (event) => {
    event.preventDefault();
    create_and_update_product();
})

function create_and_update_product() {
 var item_number = document.getElementById('item_number').value;
 var name = document.getElementById('name').value;
 var units = document.getElementById('units').value;
 var unit_price = document.getElementById('unit_price').value;
 var stock = document.getElementById('stock').value;
 var kg_per_unit = document.getElementById('kg_per_unit').value;
 var vat_key = document.getElementById('vat_key').value;
 var id = document.getElementById('id').value;

    let data_to_send = {
        "item_number":  item_number,
        "name": name,
        "units": units,
        "unit_price": unit_price,
        "stock": stock,
        "kg_per_unit": kg_per_unit,
        "vat_key": vat_key,
        "id": id,
    }
    let amethod = '';
    if (id === '') {  amethod= 'POST'}
    else {amethod = 'PUT'};
    fetch( serverUrl+ `/products`, {
        method: amethod,
        body: JSON.stringify(data_to_send),
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${authToken}` // az auth token hozzáadása az Authorization header-hez
        }
    }).then( res => { 
        console.log( 'fetch result', res);
        console.log( 'id: ', id );
        localStorage.setItem('back_id', id);
        redirectToProductTable();
    })
}

const delete_product_button = document.getElementById("delete_button");

delete_product_button.addEventListener("click", (event) => {
    event.preventDefault();
    delete_product();
})

function delete_product() {
    var id = document.getElementById('id').value;

    if ( confirm( 'Biztos benne? Töröljük a terméket? '+ document.getElementById('name').value)) {
        fetch( serverUrl+ `/products/${id}`, {
            method: "DELETE",
            'Authorization': `Bearer ${authToken}` // az auth token hozzáadása az Authorization header-hez
        }).then( res => {
            console.log( res);
            redirectToProductTable();
        })
    }
}

function redirectToProductTable() {
    window.location.href = "product_table.html";
}
