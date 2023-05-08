const cached_product_Data = localStorage.getItem('data');

if (cached_product_Data) {
    let felbontva = cached_product_Data.split(",");

    document.getElementById('input_product_item_number').value = felbontva[0];
    document.getElementById('input_product_name').value = felbontva[1];
    document.getElementById('input_product_units').value = felbontva[2];
    document.getElementById('input_product_unit_price').value = felbontva[3];
    document.getElementById('input_product_stock').value = felbontva[4];
    document.getElementById('input_product_kg_per_unit').value = felbontva[5];
    document.getElementById('input_product_vatKey').value = felbontva[6];
    document.getElementById('input_product_id').value = felbontva[7];
   
    localStorage.clear();
}

const submit_button_product = document.getElementById("submit_button");

submit_button_product.addEventListener("click", (event) => {
    event.preventDefault();
    create_and_update_user();
})

function create_and_update_user() {
 var input_product_item_number = document.getElementById('input_product_item_number').value;
 var input_product_name = document.getElementById('input_product_name').value;
 var input_product_units = document.getElementById('input_product_units').value;
 var input_product_unit_price = document.getElementById('input_product_unit_price').value;
 var input_product_stock = document.getElementById('input_product_stock').value;
 var input_product_kg_per_unit = document.getElementById('input_product_kg_per_unit').value;
 var input_product_vatKey = document.getElementById('input_product_vatKey').value;
 var input_product_id = document.getElementById('input_product_id').value;

    let data_to_send = {
        "item_number":  input_product_item_number,
        "name": input_product_name,
        "units": input_product_units,
        "unit_price": input_product_unit_price,
        "unit_stock": input_product_stock,
        "kg_per_unit": input_product_kg_per_unit,
        "vat_key": input_product_vatKey,
        "id": input_product_id,
        
    }

    if (input_product_id === '') {
        fetch("http://localhost:3001/products", {
            method: "POST",
            body: JSON.stringify(data_to_send),
            headers: {
                "Content-type": "application/json"
            }
        }).then( res => console.log( res))
    } else {
        fetch(`http://localhost:3001/products/${input_product_id}`, {
            method: "PUT",
            body: JSON.stringify(data_to_send),
            headers: {
                "Content-type": "application/json"
            }
        }).then( res => console.log( res))
    }
}


const delete_product_button = document.getElementById("delete_button");

delete_product_button.addEventListener("click", (event) => {
    event.preventDefault();
    delete_user();
})




function delete_user() {
    var input_product_id = document.getElementById('input_product_id').value;

    fetch(`http://localhost:3001/products/${input_product_id}`, {
        method: "DELETE"
    })
 
      setTimeout(redirectToUserTable, 300);

   
   
}

function redirectToUserTable() {
    window.location.href = "product_table.html";
  }
