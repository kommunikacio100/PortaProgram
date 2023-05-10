const cached_owner_id = localStorage.getItem('owner_id');

if (cached_owner_id) {
    fetch('http://localhost:3001/owners/'+ cached_owner_id)
    .then(response => response.json())
    .then( data => {
        document.getElementById('vat_number').value = data[0].vat_number;
        document.getElementById('name').value = data[0].name;
        document.getElementById('bank_account').value = data[0].bank_account;
        document.getElementById('memo').value = data[0].memo;
        document.getElementById('id').value = data[0].id;
    });
    localStorage.clear();
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

    fetch("http://localhost:3001/owners", {
        method: amethod,
        body: JSON.stringify(data_to_send),
        headers: {
            "Content-type": "application/json"
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
        fetch(`http://localhost:3001/owners/${id}`, {
            method: "DELETE"
        }).then(redirectToOwnerTable());
    }
}

function redirectToOwnerTable() {
    window.location.href = "owner_table.html";
}
