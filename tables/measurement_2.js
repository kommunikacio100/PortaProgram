
import { authToken, serverUrl, requestOptions } from './requestOptions.js';

const measurement_id = localStorage.getItem('measurement_id');
console.log(measurement_id);


fetch( serverUrl + `/measurements/${measurement_id}`, requestOptions)
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        datas.map(data => {
            // console.log(data);
            //document.getElementById("input_plate_number").value=data.vehicle_id;

            fetch( serverUrl + `/vehicles/${data.vehicle_id}`, requestOptions)
                .then(response => response.json())
                .then(datas => {
                    //console.log(datas);
                    datas.map(data => {
                        //console.log(data);
                        document.getElementById("input_plate_number").value = data.plate_number1;
                    });
                })

            fetch( serverUrl + `/products/${data.product_id}`, requestOptions)
                .then(response => response.json())
                .then(datas => {
                    //console.log(datas);
                    datas.map(data => {
                        //console.log(data);
                        document.getElementById("product").value = data.name + ', ' + data.item_number;
                    });
                })

            document.getElementById("weight_inbound").value = data.first_weight;


            //ezt javítnai kell
            console.log(data.first_time);
            document.getElementById("weight_time_inbound").value = data.first_time.substring(0, data.first_time.length-5);;


        });

    })

fetch( serverUrl + '/products', requestOptions)
    .then(response => response.json())
    .then(datas => {
        //console.log(datas);
        let option = document.createElement('option');
        option.innerText = 'válasszon terméket!';
        product.append(option);
        datas.map(data => {
            //console.log(data);
            let option = document.createElement('option');
            option.innerText = data.name + ', ' + data.item_number;
            option.id = data.id;
            product.append(option);
        });
    })




scaleWeightBtn = document.getElementById("scaleWeight");
//emptyWeightBtn = document.getElementById("emptyWeight");


weight_outbound = document.getElementById("weight_outbound");
weight_time_outbound = document.getElementById("weight_time_outbound");


scaleWeightBtn.addEventListener("click", (event) => {
    fetch( serverUrl + '/scaleWeight', requestOptions)
        .then(response => response.json())
        .then(json => {
            console.log('JSON', json);
            weight_outbound.value = json[0].scaleWeight;
            let dateTime = new Date().toISOString();
            dateTime = dateTime.substring(0, dateTime.length - 2);
            console.log(dateTime);
            weight_time_outbound.value = dateTime;
        })
})

const submit_button_visszameres = document.getElementById("submit_button");

submit_button_visszameres.addEventListener("click", (event) => {
    event.preventDefault();
    create_and_update_measure();
})

function create_and_update_measure() {

    fetch( serverUrl + `/measurements/${measurement_id}`, requestOptions)
        .then(response => response.json())
        .then(datas => {
            // console.log(datas);
            datas.map(data => {

                var id = measurement_id;
                var delivery_note_id=data.delivery_note_id;
                console.log(delivery_note_id);
                var vehicle_id=data.vehicle_id;
                var product_id=data.product_id;
                var first_weight=data.first_weight;
                var second_weight=document.getElementById("weight_outbound").value;
                var first_time=data.first_time;
                var second_time= document.getElementById("weight_time_outbound").value;
                var net_weight="";
                var first_type=data.first_type;
                var second_type="M";

                //var delivery_note_id = cached_delivery;
                //var vehicle_id = document.getElementById('input_plate_number').value;
                //var product_id = document.getElementById('product');
                //product_id=product_id[product_id.selectedIndex].id;
                //console.log(product_id);
                //var first_weight = document.getElementById('weight_inbound').value;
                //var first_time = document.getElementById('weight_time').value;
                

                let data_to_send = {
                    "id": id,
                    "delivery_note_id": delivery_note_id,
                    "vehicle_id": vehicle_id,
                    "second_weight": second_weight,
                    "product_id": product_id,
                    "first_weight": first_weight,
                    "first_time": first_time,
                    "second_time": second_time,
                    "net_weight": net_weight,
                    "first_type": first_type,
                    "second_type": second_type


                }

                let amethod = "POST"
                if (id === '') amethod = "POST"
                else amethod = "PUT";

                console.log('data_to_send ', data_to_send);
                fetch( serverUrl + "/measurements", {
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

            })
        })
}