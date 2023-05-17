
import { authToken, serverUrl, requestOptions } from './requestOptions.js';

const cached_partner_id = localStorage.getItem('partner_id');

if (cached_partner_id) {
    fetch( serverUrl+ '/partners/'+ cached_partner_id, requestOptions)
    .then(response => response.json())
    .then( data => {
            //console.log(data);
            document.getElementById('vat_number').value = data[0].vat_number;
            document.getElementById('name').value = data[0].name;
            document.getElementById('bank_account').value = data[0].bank_account;
            document.getElementById('memo').value = data[0].memo;
            document.getElementById('id').value = data[0].id;
        });
    localStorage.removeItem("partner_id");
}

const submit_button_partner = document.getElementById("submit_button");

submit_button_partner.addEventListener("click", (event) => {
    event.preventDefault();
    create_and_update_partner();
})

function create_and_update_partner() {
 var vat_number = document.getElementById('vat_number').value;
 var name = document.getElementById('name').value;
 var bank_account = document.getElementById('bank_account').value;
 var memo = document.getElementById('memo').value;
 var id = document.getElementById('id').value;
 
    let data_to_send = {
        "id":  id,
        "vat_number": vat_number,
        "name": name,
        "memo": memo,
        "bank_account": bank_account,
    }
    let amethod = '';
    if (id === '') amethod = 'POST'
    else amethod = 'PUT';
    fetch( serverUrl+ "/partners", {
        method: amethod,
        body: JSON.stringify(data_to_send),
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${authToken}` // az auth token hozzáadása az Authorization header-hez
        }
    }).then( res => {
        console.log( res);
        localStorage.setItem('back_id', id);
        redirectToPartnerTable();
    })
}

const delete_partner_button = document.getElementById("delete_button");

delete_partner_button.addEventListener("click", (event) => {
    event.preventDefault();
    delete_partner();
})

function delete_partner() {
    var id = document.getElementById('id').value;

    if ( confirm( 'Biztos benne? Töröljük a terméket? '+ document.getElementById('name').value)) {
        fetch( serverUrl+ `/partners/${id}`, {
            method: "DELETE",
            'Authorization': `Bearer ${authToken}` // az auth token hozzáadása az Authorization header-hez
        }).then( result=>{
            console.log( result);
            redirectToPartnerTable();
        })
    }
}

function redirectToPartnerTable() {
    window.location.href = "partner_table.html";
}
