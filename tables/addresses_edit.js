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

