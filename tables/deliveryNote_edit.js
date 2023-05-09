
fetch('http://localhost:3001/owners')
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
            // console.log(data);
            nameFunction(data.name, data.id)
        })
    })

fetch('http://localhost:3001/partners')
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
            // console.log(data);
            pnameFunction(data.name, data.id)
        })
    })

function nameFunction(name, id) {

    var input_owner_name = document.getElementById("input_owner_name");
    var option = document.createElement("option");
    option.text = name;
    input_owner_name.add(option);

    fetch(`http://localhost:3001/addresses/O&/${id}`)
        .then(response => response.json())
        .then(datas => {
            // console.log(datas);
            datas.map(data => {
                // console.log(data);
                addressFunction(data.zip_code, data.city, data.street_name, data.street_type, data.street_number)
            })
        })

}

function addressFunction(zip_code, city, street_name, street_type, street_number) {

    var input_owner_address = document.getElementById("input_owner_address");
    var input_loadlocation_address = document.getElementById("input_loadlocation_address");
    var option = document.createElement("option");
    var address_option = document.createElement("option");
    option.text = zip_code + " " + city + " " + street_name + " " + street_type + " " + street_number;
    address_option.text = zip_code + " " + city + " " + street_name + " " + street_type + " " + street_number;
    input_owner_address.add(option);
    input_loadlocation_address.add(address_option);

}

function pnameFunction(name, id) {

    var input_partner = document.getElementById("input_partner");
    var option = document.createElement("option");
    option.text = name;
    input_partner.add(option);

    fetch(`http://localhost:3001/addresses/P&/${id}`)
        .then(response => response.json())
        .then(datas => {
            // console.log(datas);
            datas.map(data => {
                // console.log(data);
                paddressFunction(data.zip_code, data.city, data.street_name, data.street_type, data.street_number)
            })
        })

}

function paddressFunction(zip_code, city, street_name, street_type, street_number) {

    var input_partner_address = document.getElementById("input_partner_address");
    var input_unloadlocation_address = document.getElementById("input_unloadlocation_address");
    var option = document.createElement("option");
    var address_option = document.createElement("option");
    option.text = zip_code + " " + city + " " + street_name + " " + street_type + " " + street_number;
    address_option.text = zip_code + " " + city + " " + street_name + " " + street_type + " " + street_number;
    input_partner_address.add(option);
    input_unloadlocation_address.add(address_option);

}




