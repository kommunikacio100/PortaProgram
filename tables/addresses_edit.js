
import { serverUrl, authToken, requestOptions } from './requestOptions.js';

const cached_address_id = localStorage.getItem('address_id');

if (cached_address_id) {

    fetch(serverUrl + '/addresses/' + cached_address_id, requestOptions)
        .then(response => response.json())
        .then(datas => {
            // console.log(datas);
            datas.map(data => {
                console.log(data.zip_code);
                if (data.to_table == "O") {
                    document.getElementById("input_to_table").value = "Tulajdonosok";
                }else if(data.to_table == "P"){
                    document.getElementById("input_to_table").value = "Partnerek";
                }else{
                    document.getElementById("input_to_table").value = "Szállítmányozók";
                }
                var table;
                if (data.to_table == "O") {
                    table = "owners";
                } else if (data.to_table == "C") {
                    table = "carriers";
                } else {
                    table = "partners";
                }

                fetch(serverUrl + `/${table}/${data.to_id}`, requestOptions)
                    .then(response => response.json())
                    .then(datas => {
                        datas.map(data => {
                            //console.log(data.name);
                            if(table=="owners"){
                                document.getElementById("input_to_id").value = data.name + " " + data.vat_number;
                            }else if(table=="carriers"){
                                document.getElementById("input_to_id").value = data.name;
                            }else{
                                document.getElementById("input_to_id").value = data.name + " " + data.vat_number;
                            }
                        })

                    })
                if (data.defaulted == "1") {
                    document.getElementById("input_defaulted").value = "IGEN";
                } else {
                    document.getElementById("input_defaulted").value = "NEM";

                }

               
                var countrycode = data.country_code;

                //console.log(input_zip_code);

                fetch(serverUrl + '/countries', requestOptions)
                    .then(response => response.json())
                    .then(datas => {

                        datas.map(data => {

                            if (data.code == countrycode) {
                                document.getElementById("input_country_code").value = data.name;

                            }
                        })
                    })
                    console.log(data.zip_code);
                    document.getElementById("input_zip_code").value=data.zip_code;
                    document.getElementById("input_city").value=data.city;
                    document.getElementById("input_street_name").value=data.street_name;
                    document.getElementById("input_street_type").value=data.street_type;
                    document.getElementById("input_street_number").value=data.street_number;
                    document.getElementById("input_id").value=data.id;

            });
            // jumpToRow();
        })



        localStorage.clear();


}

fetch(serverUrl + '/owners', requestOptions)
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

fetch(serverUrl + '/partners', requestOptions)
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

fetch(serverUrl + '/carriers', requestOptions)
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

fetch(serverUrl + '/street_types', requestOptions)
    .then(response => response.json())
    .then(datas => {

        datas.map(data => {

            StreetNameFunction(data.street_type, data.id)
        })
    })

function StreetNameFunction(street_type, id) {

    var input_street_type = document.getElementById("input_street_type");
    var option = document.createElement("option");
    option.text = street_type;
    option.id = id;
    input_street_type.add(option);

}

fetch(serverUrl + '/countries', requestOptions)
    .then(response => response.json())
    .then(datas => {

        datas.map(data => {

            CountryNameFunction(data.name, data.code)
        })
    })

function CountryNameFunction(name, code) {

    var input_country_code = document.getElementById("input_country_code");
    var option = document.createElement("option");
    option.text = name;
    option.id = code;
    input_country_code.add(option);

}

fetch(serverUrl + '/zip_codes', requestOptions)
    .then(response => response.json())
    .then(datas => {

        datas.map(data => {

            ZipFunction(data.zip_code, data.city, data.id)
        })
    })

function ZipFunction(zip_code, city, id) {

    var input_zip_code = document.getElementById("input_zip_code");
    var option = document.createElement("option");
    option.text = zip_code;
    option.id = id;
    input_zip_code.add(option);

}

function updateCity() {

    var input_zip_code = document.getElementById("input_zip_code");
    input_zip_code = input_zip_code[input_zip_code.selectedIndex].id;

    console.log(input_zip_code);

    fetch(serverUrl + '/zip_codes', requestOptions)
        .then(response => response.json())
        .then(datas => {

            datas.map(data => {

                if (data.id == input_zip_code) {
                    document.getElementById("input_city").value = data.city;

                }
            })
        })

}

const submit_button_addresses = document.getElementById("submit_button");

submit_button_addresses.addEventListener("click", (event) => {
    event.preventDefault();
    create_and_update_addresses();
})

function create_and_update_addresses() {

    var to_table = document.getElementById("input_to_table").value;


    if (to_table == "Tulajdonosok") {
        to_table = "O";
    } else if (to_table == "Partnerek") {
        to_table = "P";
    } else {
        to_table = "C";
    }

    var to_id = document.getElementById("input_to_id");
    to_id = to_id[to_id.selectedIndex].id;

    var defaulted = document.getElementById("input_defaulted").value;

    if (defaulted == "IGEN") {
        defaulted = "1";
    } else {
        defaulted = "0";
    }

    var country_code = document.getElementById("input_country_code");
    country_code = country_code[country_code.selectedIndex].id;

    console.log(country_code);

    var zip_code = document.getElementById("input_zip_code").value;


    console.log(zip_code);

    var city = document.getElementById("input_city").value;

    console.log(city);

    var street_name = document.getElementById("input_street_name").value;

    console.log(street_name);

    var street_type = document.getElementById("input_street_type").value;

    console.log(street_type);

    var street_number = document.getElementById("input_street_number").value;

    console.log(street_number);

    var id = document.getElementById("input_id").value;



    let data_to_send = {
        "id": id,
        "to_table": to_table,
        "to_id": to_id,
        "defaulted": defaulted,
        "country_code": country_code,
        "zip_code": zip_code,
        "city": city,
        "street_name": street_name,
        "street_type": street_type,
        "street_number": street_number,



    }

    let amethod = "POST"
    if (id === '') amethod = "POST"
    else amethod = "PUT";

    console.log('data_to_send ', data_to_send);
    fetch(serverUrl + "/addresses", {
        method: amethod,
        body: JSON.stringify(data_to_send),
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${authToken}` // az auth token hozzáadása az Authorization header-hez
        }
    }).then(result => {
        console.log(result)
        //localStorage.setItem('back_id', id);
        //redirectToOwnerTable();
    });

}







