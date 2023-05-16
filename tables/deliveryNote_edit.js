import { authToken, serverUrl, requestOptions } from './requestOptions.js';

const cached_delivery_id = localStorage.getItem('deliveryNote_id');

if (cached_delivery_id) {
    fetch( serverUrl+ '/delivery_notes/' + cached_delivery_id, requestOptions)
        .then(response => response.json())
        .then(datas => {

            datas.map(data => {

                if (data.owner_id != null) {
                    fetch( serverUrl+ '/owners/' + data.owner_id, requestOptions)
                        .then(response => response.json())
                        .then(datas => {

                            datas.map(data => {

                                document.getElementById('input_owner_name').value = data.name + " " + data.vat_number;

                            })
                        })
                }
                console.log('data.owner_address_id ', data.owner_address_id);
                if (data.owner_address_id != null) {
                    fetch( serverUrl+ '/addresses/' + data.owner_address_id, requestOptions)
                        .then(response => response.json())
                        .then(datas => {
                            console.log(datas);
                            datas.map(data => {

                                document.getElementById('input_owner_address').value = data.zip_code + " " + data.city + " " + data.street_name + " " + data.street_type + " " + data.street_number;
                                document.getElementById('input_loadlocation_address').value = data.zip_code + " " + data.city + " " + data.street_name + " " + data.street_type + " " + data.street_number;

                            })
                        })
                }
                if (data.partner_id != null) {
                    fetch( serverUrl+ '/partners/' + data.partner_id, requestOptions)
                        .then(response => response.json())
                        .then(datas => {

                            datas.map(data => {

                                document.getElementById('input_partner').value = data.name + " " + data.vat_number;

                            })
                        })
                }
                if (data.partner_address_id != null) {
                    fetch( serverUrl+ '/addresses/' + data.partner_address_id, requestOptions)
                        .then(response => response.json())
                        .then(datas => {

                            datas.map(data => {

                                document.getElementById('input_partner_address').value = data.zip_code + " " + data.city + " " + data.street_name + " " + data.street_type + " " + data.street_number;
                                document.getElementById('input_unloadlocation_address').value = data.zip_code + " " + data.city + " " + data.street_name + " " + data.street_type + " " + data.street_number;

                            })
                        })
                }
                if (data.carrier_id != null) {
                    fetch( serverUrl+ '/carriers/' + data.carrier_id, requestOptions)
                        .then(response => response.json())
                        .then(datas => {

                            datas.map(data => {

                                document.getElementById('input_carrier').value = data.name;

                            })
                        })
                }
                if (data.carrier_address_id != null) {
                    fetch( serverUrl+ '/addresses/' + data.carrier_address_id, requestOptions)
                        .then(response => response.json())
                        .then(datas => {

                            datas.map(data => {

                                document.getElementById('input_carrier_address').value = data.zip_code + " " + data.city + " " + data.street_name + " " + data.street_type + " " + data.street_number;

                            })
                        })
                }

                if (data.movement_id != null) {
                    let move = data.movement_id;
                    fetch( serverUrl+ '/movements', requestOptions)
                        .then(response => response.json())
                        .then(datas => {

                            datas.map(data => {

                                if (data.id == move) {
                                    document.getElementById('input_movement').value = data.name;
                                }

                            })
                        })
                }


                document.getElementById('input_status').value = data.status;
                document.getElementById('input_deliveryNote_id').value = data.id;
                document.getElementById('input_serial_no').value = data.serial_no;

                


            })
        })
    localStorage.clear();
}



fetch( serverUrl+ '/owners', requestOptions)
    .then(response => response.json())
    .then(datas => {

        datas.map(data => {

            OwnerNameFunction(data.name, data.id, data.vat_number)

        })
    })

fetch( serverUrl+ "/addresses", requestOptions)
    .then(response => response.json())
    .then(datas => {

        datas.map(data => {

            if (data.to_table == "O") {
                OwnerAddressFunction(data.zip_code, data.city, data.street_name, data.street_type, data.street_number, data.id);
            }
        })
    })

fetch( serverUrl+ '/partners', requestOptions)
    .then(response => response.json())
    .then(datas => {

        datas.map(data => {

            PartnerNameFunction(data.name, data.id, data.vat_number);
        })
    });

fetch( serverUrl+ `/addresses`, requestOptions)
    .then(response => response.json())
    .then(datas => {

        datas.map(data => {

            if (data.to_table == "P") {
                PartnerAddressFunction(data.zip_code, data.city, data.street_name, data.street_type, data.street_number, data.id)
            }
        })
    })

fetch( serverUrl+ '/carriers', requestOptions)
    .then(response => response.json())
    .then(datas => {

        datas.map(data => {

            CarrierNameFunction(data.name, data.id)
        })
    })

fetch( serverUrl+ `/addresses`, requestOptions)
    .then(response => response.json())
    .then(datas => {

        datas.map(data => {

            if (data.to_table == "C") {
                CarrierAddressFunction(data.zip_code, data.city, data.street_name, data.street_type, data.street_number, data.id)
            }
        })
    })

fetch( serverUrl+ '/movements', requestOptions)
    .then(response => response.json())
    .then(datas => {

        datas.map(data => {

            Movements(data.name, data.id)
        })
    })

function OwnerNameFunction(name, id, vat_number) {

    var input_owner_name = document.getElementById("input_owner_name");
    var option2 = document.createElement("option");
    option2.text = name + " " + vat_number;
    option2.id = id;

    input_owner_name.append(option2);


}

function OwnerAddressFunction(zip_code, city, street_name, street_type, street_number, dataid) {

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

}

function PartnerNameFunction(name, id, vat_number) {

    var input_partner = document.getElementById("input_partner");
    var option = document.createElement("option");
    option.text = name + " " + vat_number;
    option.id = id;
    input_partner.add(option);

}

function PartnerAddressFunction(zip_code, city, street_name, street_type, street_number, dataid) {

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

}


function CarrierNameFunction(name, id) {

    var input_carrier = document.getElementById("input_carrier");
    var option = document.createElement("option");
    option.text = name;
    option.id = id;
    input_carrier.add(option);

}


function CarrierAddressFunction(zip_code, city, street_name, street_type, street_number, dataid) {

    var input_carrier_address = document.getElementById("input_carrier_address");
    var option = document.createElement("option");
    option.id = dataid;
    option.text = zip_code + " " + city + " " + street_name + " " + street_type + " " + street_number;
    input_carrier_address.add(option);


}

function Movements(name, id) {

    var input_movement = document.getElementById("input_movement");
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

function create_and_update_delivery_note(status = "NYITVA") {
    var serial_no = document.getElementById('input_serial_no').value;

    var owner_id = document.getElementById('input_owner_name');
    owner_id = owner_id[owner_id.selectedIndex].id;
    var owner_address_id = document.getElementById('input_owner_address');
    owner_address_id = owner_address_id[owner_address_id.selectedIndex].id;
    console.log('owner_address_id ', owner_address_id, ' index ', owner_address_id.selectedIndex);
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

    console.log('data_to_send ', data_to_send);
    let amethod = 'PUT';
    fetch( serverUrl+ `/delivery_notes`, {
        method: amethod,
        body: JSON.stringify(data_to_send),
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${authToken}`
        }
    }).then(res => {
        console.log('fetch result', res);
        //console.log('id: ', id);
        //localStorage.setItem('back_id', id);
        //redirectToOpenDeliveryNotesTable();
    })
}


const close_deliverynote_edit = document.getElementById("close_button");

close_deliverynote_edit.addEventListener("click", (event) => {
    event.preventDefault();
    create_and_update_delivery_note("LEZÁRVA");
});



const delete_deliveryNote_button = document.getElementById("delete_button");

delete_deliveryNote_button.addEventListener("click", (event) => {
    event.preventDefault();
    delete_delivery_note();
});

function delete_delivery_note() {
    var id = document.getElementById('input_deliveryNote_id').value;
    if (confirm('Biztos benne? Töröljük a szállítólevelet?')) {
        fetch( serverUrl+ `/delivery_notes/${id}`, {
            method: "DELETE",
            'Authorization': `Bearer ${authToken}`
        }).then(redirectToOpenDeliveryNotesTable());
    }
}

function redirectToOpenDeliveryNotesTable() {
    window.location.href = "open_deliveryNotes_table.html";
}


const uj_meres = document.getElementById("gomb_uj_letrehozasa");

uj_meres.addEventListener("click", (event) => {

    var id = document.getElementById('input_deliveryNote_id').value;

    localStorage.setItem('deliveryNote_id_for_measure', id);
    window.location.href = "measurement_1.html";




})

setTimeout(() => {
    Measurements();
  }, 400);


function Measurements() {

    let measures_tbody = document.getElementById('tbody');
    var id_for = document.getElementById('input_deliveryNote_id').value;

    console.log(id_for);

    fetch( serverUrl+ '/measurements', requestOptions)
        .then(response => response.json())
        .then(datas => {
            // console.log(datas);
            datas.map(data => {
                // console.log(data);
                if (data.delivery_note_id == id_for) {
                    measures_tbody.append(trFunction(data.vehicle_id, data.product_id, data.first_weight, data.second_weight, data.net_weight, data.id))
                }
            });
            jumpToRow();
        })

    function trFunction(vehicle_id, product_id, first_weight, second_weight, net_weight, id) {

        let tr = document.createElement('tr');
        tr.innerHTML = `
    <td class="plate_number1" style="font-weight: bold;"></td>
    <td class="product_name"></td>
    <td class="owner_name">${first_weight}</td>
    <td class="carrier_name">${second_weight}</td>
    <td class="creation_date">${net_weight}</td>
    <td class="deliveryNotes_id">${id}</td>
        `

        if (vehicle_id != null) {
            fetch( serverUrl+ `/vehicles/${vehicle_id}`, requestOptions)
                .then(response => response.json())
                .then(datas => {
                    datas.map(data => {
                        //console.log(data.name);
                        tr.querySelector('.plate_number1').textContent = data.plate_number1;
                    })

                })
        }
        if (product_id != null) {
            fetch( serverUrl+ `/products`, requestOptions)
                .then(response => response.json())
                .then(datas => {
                    datas.map(data => {
                        //console.log(data.name);
                        tr.querySelector('.product_name').textContent = data.name;
                    })

                })

        }
        /*
        if(carrier_id!=null){
        
        }
        */
        tr.ondblclick = function (event) {
            myEditFunction(event, id);
        }
        tr.setAttribute("id", id);


        return tr;


    }


    // ha volt új, vagy szerkesztett sor, odaugrik
    function jumpToRow() {
        let back_id = localStorage.getItem('back_id');
        if (back_id) {
            console.log('back_id: ', back_id)
            let row = document.getElementById(back_id);
            if (row) {
                row.scrollIntoView(true);
            }
            localStorage.clear();
        }
    }

    function myEditFunction(event, id) {

        // let td = event.target;
        // let tr = td.parentNode;
        // let adatok = tr.outerText.split("\t");

        localStorage.setItem('measurement_id', id);
        window.location.href = `measurement_2.html`;
    }

}
