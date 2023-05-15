fetch('http://localhost:3001/owners')
    .then(response => response.json())
    .then(datas => {

        datas.map(data => {

            OwnerNameFunction(data.name, data.id, data.vat_number)

        })
    })

function OwnerNameFunction(name, id, vat_number) {

    var input_to_id = document.getElementById("input_to_id");
    var option2 = document.createElement("option");
    option2.text = name + " " + vat_number;
    option2.id = id;

    input_to_id.append(option2);


}

fetch('http://localhost:3001/partners')
    .then(response => response.json())
    .then(datas => {

        datas.map(data => {

            PartnerNameFunction(data.name, data.id, data.vat_number);
        })
    });

function PartnerNameFunction(name, id, vat_number) {

    var input_to_id = document.getElementById("input_to_id");
    var option = document.createElement("option");
    option.text = name + " " + vat_number;
    option.id = id;
    input_to_id.add(option);

}

fetch('http://localhost:3001/carriers')
    .then(response => response.json())
    .then(datas => {

        datas.map(data => {

            CarrierNameFunction(data.name, data.id)
        })
    })

function CarrierNameFunction(name, id) {

    var input_to_id = document.getElementById("input_to_id");
    var option = document.createElement("option");
    option.text = name;
    option.id = id;
    input_to_id.add(option);

}
/*
fetch('http://localhost:3001/street_types')
    .then(response => response.json())
    .then(datas => {

        datas.map(data => {

            StreetNameFunction(data.street_type, data.id)
        })
    })

function StreetNameFunction(street_type, id) {

    var input_street_name = document.getElementById("input_street_name");
    var option = document.createElement("option");
    option.text = street_type;
    option.id = id;
    input_street_name.add(option);

}
*/
