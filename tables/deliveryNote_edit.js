fetch('http://localhost:3001/owners')
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
             //console.log(data);
           // OwnerNameFunction(data.name, data.id, data.vat_number)
        })
    })





fetch('http://localhost:3001/owners')
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
             //console.log(data);
            OwnerNameFunction(data.name, data.id)
            console.log(data.name, data.id);
        })
    })

fetch('http://localhost:3001/partners')
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
            // console.log(data);
            PartnerNameFunction(data.name, data.id);
        })
    });

fetch('http://localhost:3001/carriers')
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
            // console.log(data);
            CarrierNameFunction(data.name, data.id)
        })
    })

fetch('http://localhost:3001/movements')
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
            // console.log(data);
            Movements(data.name, data.id)
        })
    })

function OwnerNameFunction(name, id) {

   
   
    fetch(`http://localhost:3001/addresses/O&/${id}`)
        .then(response => response.json())
        .then(datas => {
            // console.log(datas);
            datas.map(data => {
                // console.log(data);
                OwnerAddressFunction(name, id, data.zip_code, data.city, data.street_name, data.street_type, data.street_number, data.id);
            
            })
        })

}

function OwnerAddressFunction(name, id, zip_code, city, street_name, street_type, street_number, dataid) {

    var input_owner_address = document.getElementById("input_owner_address");
    var input_loadlocation_address = document.getElementById("input_loadlocation_address");
    var option = document.createElement("option");
    var address_option = document.createElement("option");
    option.text = zip_code + " " + city + " " + street_name + " " + street_type + " " + street_number;
    address_option.text = zip_code + " " + city + " " + street_name + " " + street_type + " " + street_number;
    option.id = dataid;
    address_option.id = dataid;
    input_owner_address.append(option);
    input_loadlocation_address.append(address_option);

    var input_owner_name = document.getElementById("input_owner_name");
    var option2 = document.createElement("option");
    option2.text = name + " " + zip_code + " " + city + " " + street_name + " " + street_type + " " + street_number;
    option2.id = id;
    console.log(name+"x "+id);
    //console.log(option.id);
    input_owner_name.append(option2);

}

function PartnerNameFunction(name, id) {
    
    fetch(`http://localhost:3001/addresses/P&/${id}`)
        .then(response => response.json())
        .then(datas => {
            // console.log(datas);
            datas.map(data => {
                // console.log(data);
                PartnerAddressFunction(name, id, data.zip_code, data.city, data.street_name, data.street_type, data.street_number, data.id)
            })
        })

}

function PartnerAddressFunction(name, id, zip_code, city, street_name, street_type, street_number, dataid) {

    var input_partner_address = document.getElementById("input_partner_address");
    var input_unloadlocation_address = document.getElementById("input_unloadlocation_address");
    var option = document.createElement("option");
    var address_option = document.createElement("option");
    option.text = zip_code + " " + city + " " + street_name + " " + street_type + " " + street_number;
    address_option.text = zip_code + " " + city + " " + street_name + " " + street_type + " " + street_number;
    option.id = dataid;
    address_option.id = dataid;
    input_partner_address.add(option);
    input_unloadlocation_address.add(address_option);


    var input_partner = document.getElementById("input_partner");
    var option = document.createElement("option");
    option.text = name + " " + zip_code + " " + city + " " + street_name + " " + street_type + " " + street_number;
    option.id = id;
    input_partner.add(option);

}


function CarrierNameFunction(name, id) {
    
    fetch(`http://localhost:3001/addresses/C&/${id}`)
        .then(response => response.json())
        .then(datas => {
            // console.log(datas);
            datas.map(data => {
                // console.log(data);
                CarrierAddressFunction(name, id, data.zip_code, data.city, data.street_name, data.street_type, data.street_number, data.id)
            })
        })

}


function CarrierAddressFunction(name, id, zip_code, city, street_name, street_type, street_number, dataid) {

    var input_carrier_address = document.getElementById("input_carrier_address");
    var option = document.createElement("option");
    option.id = dataid;
    option.text = zip_code + " " + city + " " + street_name + " " + street_type + " " + street_number;
    input_carrier_address.add(option);

    var input_carrier = document.getElementById("input_carrier");
    var option = document.createElement("option");
    option.text = name;
    option.id = id;
    input_carrier.add(option);

}

function Movements(name, id) {

    var input_movement= document.getElementById("input_movement");
    var option = document.createElement("option");
    option.id = id;
    option.text = name;
    input_movement.add(option);

}

const submit_button_deliverynote_edit = document.getElementById("submit_button");

submit_button_deliverynote_edit.addEventListener("click", (event) => {
    event.preventDefault();
    create_and_update_delivery_note();
});

function create_and_update_delivery_note(status="Nyitott") {
    var serial_no = document.getElementById('input_serial_no').value;

    var owner_id = document.getElementById('input_owner_name');
    owner_id = owner_id[owner_id.selectedIndex].id;
    var owner_address_id = document.getElementById('input_owner_address');
    owner_address_id = owner_address_id[owner_address_id.selectedIndex].id;
    var loadlocation_address_id = document.getElementById('input_loadlocation_address');
    loadlocation_address_id = loadlocation_address_id[loadlocation_address_id.selectedIndex].id;

    var partner_id = document.getElementById('input_partner');
    partner_id = partner_id[partner_id.selectedIndex].id;
    var partner_address_id = document.getElementById('input_partner_address');
    partner_address_id = partner_address_id[partner_address_id.selectedIndex].id;
    var unloadlocation_address_id = document.getElementById('input_unloadlocation_address');
    unloadlocation_address_id = unloadlocation_address_id[unloadlocation_address_id.selectedIndex].id;

    var carrier_id = document.getElementById('input_carrier');
    carrier_id = carrier_id[carrier_id.selectedIndex].id;
    var carrier_address_id = document.getElementById('input_carrier_address');
    carrier_address_id = carrier_address_id[carrier_address_id.selectedIndex].id;

    var movement_id = document.getElementById('input_movement');
    movement_id = movement_id[movement_id.selectedIndex].id;
    var id = document.getElementById('input_deliveryNote_id').value;

    //console.log(movement_id);

    let data_to_send = {
        "serial_no": serial_no,
        "owner_id": owner_id,
        "owner_address_id": owner_address_id,
        "loadlocation_address_id": loadlocation_address_id,
        "partner_id": partner_id,
        "partner_address_id": partner_address_id,
        "unloadlocation_address_id": unloadlocation_address_id,
        "carrier_id": carrier_id,
        "carrier_address_id": carrier_address_id,
        "movement_id": movement_id,
        "status": status,
        "id": id,

    }

    let amethod = '';
    if (id === '') { amethod = 'POST' }
    else { amethod = 'PUT' };
    fetch(`http://localhost:3001/delivery_notes`, {
        method: amethod,
        body: JSON.stringify(data_to_send),
        headers: {
            "Content-type": "application/json"
        }
    }).then(res => {
        console.log('fetch result', res);
        console.log('id: ', id);
        localStorage.setItem('back_id', id);
        // redirectToProductTable();
    })
}

//át kell írni a html-ben az id-t h ne submit legyen
const close_deliverynote_edit = document.getElementById("close_button");

close_deliverynote_edit.addEventListener("click", (event) => {
    event.preventDefault();
    create_and_update_delivery_note("Lezárt");
});



const delete_deliveryNote_button = document.getElementById("delete_button");

delete_deliveryNote_button.addEventListener("click", (event) => {
    event.preventDefault();
    delete_delivery_note();
});

function delete_delivery_note() {
    var id = document.getElementById('input_deliveryNote_id').value;
    if ( confirm( 'Biztos benne? Töröljük a sorszámú szállítólevelet? '+ document.getElementById('input_serial_no').value)) {
        fetch(`http://localhost:3001/delivery_notes/${id}`, {
            method: "DELETE"
        }).then(redirectToOpenDeliveryNotesTable());
    }
}

function redirectToOpenDeliveryNotesTable() {
    window.location.href = "open_deliveryNotes_table.html";
}

