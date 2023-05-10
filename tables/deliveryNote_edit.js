
fetch('http://localhost:3001/owners')
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
            // console.log(data);
            OwnerNameFunction(data.name, data.id, data.vat_number)
        })
    })

fetch('http://localhost:3001/partners')
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
            // console.log(data);
            PartnerNameFunction(data.name, data.id)
        })
    })

fetch('http://localhost:3001/carriers')
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
            // console.log(data);
            CarrierNameFunction(data.name, data.id)
        })
    })

function OwnerNameFunction(name, id, vat_number) {
    /*
    var input_owner_name = document.getElementById("input_owner_name");
    var option = document.createElement("option");
    option.text = name+" "+vat_number;
    input_owner_name.add(option);
    */
    fetch(`http://localhost:3001/addresses/O&/${id}`)
        .then(response => response.json())
        .then(datas => {
            // console.log(datas);
            datas.map(data => {
                // console.log(data);
                OwnerAddressFunction(name, id, data.zip_code, data.city, data.street_name, data.street_type, data.street_number, data.id)
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
    input_owner_address.add(option);
    input_loadlocation_address.add(address_option);

    var input_owner_name = document.getElementById("input_owner_name");
    var option = document.createElement("option");
    option.text = name + " " + zip_code + " " + city + " " + street_name + " " + street_type + " " + street_number;
    option.id = id;
    console.log(option.id);
    input_owner_name.add(option);

}

function PartnerNameFunction(name, id) {
    /*
    var input_partner = document.getElementById("input_partner");
    var option = document.createElement("option");
    option.text = name;
    input_partner.add(option);
    */
    fetch(`http://localhost:3001/addresses/P&/${id}`)
        .then(response => response.json())
        .then(datas => {
            // console.log(datas);
            datas.map(data => {
                // console.log(data);
                PartnerAddressFunction(name,id,data.zip_code, data.city, data.street_name, data.street_type, data.street_number,data.id)
            })
        })

}

function PartnerAddressFunction(name,id,zip_code, city, street_name, street_type, street_number,dataid) {

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

    var input_carrier = document.getElementById("input_carrier");
    var option = document.createElement("option");
    option.text = name;
    input_carrier.add(option);

    fetch(`http://localhost:3001/addresses/C&/${id}`)
        .then(response => response.json())
        .then(datas => {
            // console.log(datas);
            datas.map(data => {
                // console.log(data);
                CarrierAddressFunction(data.zip_code, data.city, data.street_name, data.street_type, data.street_number)
            })
        })

}


function CarrierAddressFunction(zip_code, city, street_name, street_type, street_number) {

    var input_carrier_address = document.getElementById("input_carrier_address");
    var option = document.createElement("option");
    option.text = zip_code + " " + city + " " + street_name + " " + street_type + " " + street_number;
    input_carrier_address.add(option);

}

const submit_button_deliverynote_edit = document.getElementById("submit_button");

submit_button_deliverynote_edit.addEventListener("click", (event) => {
    event.preventDefault();
    create_and_update_delivery_note();
});

function create_and_update_delivery_note() {
    var serial_no = document.getElementById('input_serial_no').value;
    var owner_id = document.getElementById('input_owner_name');
    owner_id = owner_id[owner_id.selectedIndex].id;
    var owner_address_id = document.getElementById('input_owner_address');
    owner_address_id = owner_address_id[owner_address_id.selectedIndex].id;
    var loadlocation_address_id  = document.getElementById('input_loadlocation_address');
    loadlocation_address_id  = loadlocation_address_id [loadlocation_address_id .selectedIndex].id;
    
    var partner_id = document.getElementById('input_partner');
    partner_id = partner_id[partner_id.selectedIndex].id;
    var partner_address_id = document.getElementById('input_partner_address');
    partner_address_id = partner_address_id[partner_address_id.selectedIndex].id;
    var unloadlocation_address_id  = document.getElementById('input_unloadlocation_address');
    unloadlocation_address_id  = unloadlocation_address_id [unloadlocation_address_id .selectedIndex].id;
    
    var id = document.getElementById('input_deliveryNote_id').value;

    //console.log(unloadlocation_address_id );

    let data_to_send = {
        "serial_no": serial_no,
        "owner_id": owner_id,
        "owner_address_id": owner_address_id,
        "loadlocation_address_id": loadlocation_address_id,
        "partner_id": partner_id,
        "partner_address_id": partner_address_id,
        "unloadlocation_address_id": unloadlocation_address_id,
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


