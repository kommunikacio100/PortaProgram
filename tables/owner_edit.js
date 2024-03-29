
import { authToken, serverUrl, requestOptions } from './requestOptions.js';

const cached_owner_id = localStorage.getItem('owner_id');
let tbody;
if (cached_owner_id) {
    fetch( serverUrl+ '/owners/'+ cached_owner_id, requestOptions)
    .then(response => response.json())
    .then( data => {
        document.getElementById('vat_number').value = data[0].vat_number;
        document.getElementById('name').value = data[0].name;
        document.getElementById('bank_account').value = data[0].bank_account;
        document.getElementById('memo').value = data[0].memo;
        document.getElementById('id').value = data[0].id;
    });
    fetch( serverUrl+ '/addresses/O&/'+ cached_owner_id, requestOptions)
    .then(response => response.json())
    .then( data => {
        console.log( 'címlista ', data);
        tbody = document.getElementById('tbody');
        tbody.innerHTML= '';
        for (let row of data){
            console.log( 'cím zipcode ', row.zip_code);
            let tr = document.createElement('tr');
            tr.innerHtml = `
            <td class="to_id">${row.defaulted}</td>
            <td class="to_id">${row.country_code}</td>
            <td class="to_id">${row.zip_code}</td>
            <td class="to_id">${row.city}</td>
            <td class="to_id">${row.street_name}</td>
            <td class="to_id">${row.street_type}</td>
            <td class="to_id">${row.street_number}</td>
            <td class="to_id">${row.id}</td>
            ` 
            tbody.append( tr);
            tr.setAttribute("id", row.id);
        }
    });
    localStorage.removeItem("owner_id");
}

const submit_button_owner = document.getElementById("submit_button");

submit_button_owner.addEventListener("click", (event) => {
    event.preventDefault();
    create_and_update_owner();
})

function create_and_update_owner() {
 var vat_number = document.getElementById('vat_number').value;
 var name = document.getElementById('name').value;
 var bank_account = document.getElementById('bank_account').value;
 var memo = document.getElementById('memo').value;
 var id = document.getElementById('id').value;
 
    let data_to_send = {
        "id":  id,
        "vat_number": vat_number,
        "name": name,
        "bank_account": bank_account,
        "memo": memo,
        
    }

    let amethod = "POST"
    if (id === '') amethod = "POST"
    else amethod = "PUT";

    fetch( serverUrl+ "/owners", {
        method: amethod,
        body: JSON.stringify(data_to_send),
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${authToken}` // az auth token hozzáadása az Authorization header-hez
        }
    }).then( result => {
        console.log( result)
        localStorage.setItem('back_id', id);
        redirectToOwnerTable();
    });
}


const delete_owner_button = document.getElementById("delete_button");

delete_owner_button.addEventListener("click", (event) => {
    event.preventDefault();
    delete_owner();
});

function delete_owner() {
    var id = document.getElementById('id').value;
    if ( confirm( 'Biztos benne? Töröljük a tulajdonost? '+ document.getElementById('name').value)) {
        fetch( serverUrl+ `/owners/${id}`, {
            method: "DELETE",
            'Authorization': `Bearer ${authToken}` // az auth token hozzáadása az Authorization header-hez
        }).then(redirectToOwnerTable());
    }
}

function redirectToOwnerTable() {
    window.location.href = "owner_table.html";
}
