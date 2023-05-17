import { authToken, serverUrl, requestOptions } from './requestOptions.js';
/*
fetch( serverUrl+ '/owners', requestOptions)
    .then(response => response.json())
    .then(datas => {

        datas.map(data => {

            OwnerNameFunction(data.name, data.id, data.vat_number)

        })
    })
*/
const cached_carrier_id = localStorage.getItem('carrier_id');

if (cached_carrier_id) {
    fetch( serverUrl+`/carriers/${cached_carrier_id}`, requestOptions)
    .then(response => response.json())
    .then( datas => {
        // console.log(datas);
        datas.map( data => {
            // console.log(data);
            document.getElementById('name').value = data.name;
            document.getElementById('ekaer_id').value = data.ekaer_id;
            document.getElementById('memo').value = data.memo;
            document.getElementById('id').value = data.id;
        })
    })
    localStorage.removeItem("carrier_id");
}

const submit_button_carrier = document.getElementById("submit_button");

submit_button_carrier.addEventListener("click", (event) => {
    event.preventDefault();
    create_and_update_carrier();
})

function create_and_update_carrier() {
    var name = document.getElementById('name').value;
    var ekaer_id = document.getElementById('ekaer_id').value;
    var memo = document.getElementById('memo').value;
    var id = document.getElementById('id').value;
 
    let data_to_send = {
        "id":  id,
        "name": name,
        "ekaer_id": ekaer_id,
        "memo": memo,
    }

    //console.log( 'data?to?send ', data_to_send);
    
    let amethod;
    if (id === '') amethod = "POST"
    else amethod= "PUT";
    fetch( serverUrl+ "/carriers", {
        method: amethod,
        body: JSON.stringify(data_to_send),
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${authToken}`
        }
    }).then( res => {
        console.log( res)
        localStorage.setItem('back_id', id);
        redirectToCarrierTable();
    })
}


const delete_carrier_button = document.getElementById("delete_button");

delete_carrier_button.addEventListener("click", (event) => {
    event.preventDefault();
    delete_carrier();
})

function delete_carrier() {
    var id = document.getElementById('id').value;

    if ( confirm( 'Biztos benne? Töröljük a szállítmányozót? '+ document.getElementById('name').value)) {
        fetch( serverUrl + `/carriers/${id}`, {
            method: "DELETE",
            'Authorization': `Bearer ${authToken}`
        }).then( result => {
            console.log( result);
            redirectToCarrierTable();
        })
    }
}

function redirectToCarrierTable() {
    window.location.href = "carrier_table.html";
}

// ha volt új, vagy szerkesztett sor, odaugrik
function jumpToRow(){
    let back_id = localStorage.getItem('back_id');
    if (back_id){
        console.log( 'back_id: ', back_id)
        let row = document.getElementById( back_id);
        if (row){
            row.scrollIntoView( true);
        }
        localStorage.removeItem("back_id");
    }
}
