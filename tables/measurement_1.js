const authToken = localStorage.getItem( 'jwt');
const requestOptions = {
    method: 'GET', // vagy POST, PUT, DELETE, stb.
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}` // az auth token hozzáadása az Authorization header-hez
    }
  };

const cached_delivery = localStorage.getItem('deliveryNote_id_for_measure');
console.log(cached_delivery);



// betölti a rendszámokat a plateList listába
plateList = document.getElementById('plateList');
fetch('http://localhost:3001/vehicles', requestOptions)
    .then(response => response.json())
    .then(datas => {
        //console.log(datas);
        datas.map(data => {
            //console.log(data);
            let option = document.createElement('option');
            option.value = data.plate_number1 + ', ' + data.plate_number2;
            plateList.append(option);
        });
    })


// betölti a termékeket a product selectbe
fetch('http://localhost:3001/products', requestOptions)
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
emptyWeightBtn = document.getElementById("emptyWeight");

weightInbound = document.getElementById("weight_inbound");
weightTime = document.getElementById("weight_time");

scaleWeightBtn.addEventListener("click", (event) => {
    fetch('http://localhost:3001/scaleWeight', requestOptions)
        .then(response => response.json())
        .then(json => {
            console.log('JSON', json);
            weightInbound.value = json[0].scaleWeight;
            let dateTime = new Date().toISOString();
            dateTime = dateTime.substring(0, dateTime.length - 2);
            console.log(dateTime);
            weightTime.value = dateTime;
        })
})

const submit_button_measure = document.getElementById("submit_button");

submit_button_measure.addEventListener("click", (event) => {
    event.preventDefault();
    create_and_update_measure();
})

function create_and_update_measure() {
    var id = "";
    var delivery_note_id = cached_delivery;
    var vehicle_id = document.getElementById('input_plate_number').value;
    var product_id = document.getElementById('product');
    product_id=product_id[product_id.selectedIndex].id;
    console.log(product_id);
    var first_weight = document.getElementById('weight_inbound').value;
    var first_time = document.getElementById('weight_time').value;
    var first_type = "M";

    let data_to_send = {
        "id": id,
        "delivery_note_id": delivery_note_id,
        "vehicle_id": vehicle_id,
        "product_id": product_id,
        "first_weight": first_weight,
        "first_time": first_time,
        "first_type": "M",

    }
    
    let amethod = "POST"
    if (id === '') amethod = "POST"
    else amethod = "PUT";
     
    console.log('data_to_send ', data_to_send);
    fetch("http://localhost:3001/measurements", {
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