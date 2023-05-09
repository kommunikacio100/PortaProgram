
const cached_vehicle_id = localStorage.getItem('vehicle_edit_id');

console.log( "vehicle_edit_id: ", cached_vehicle_id);

if (cached_vehicle_id == null) {
    console.log( " null ");
}else{
    localStorage.clear();
    fetch('http://localhost:3001/vehicles/'+ cached_vehicle_id)
    .then(response => response.json())
    .then( vehicle_data => {
        console.log( "vehice_data: ", vehicle_data[0]);
        document.getElementById('plate_number1').value = vehicle_data[0].plate_number1;
        document.getElementById('plate_number2').value = vehicle_data[0].plate_number2;
        document.getElementById('empty_weight').value = vehicle_data[0].empty_weight;
        let time = vehicle_data[0].empty_time;
        document.getElementById('empty_time').value = time.substr( 0, time.length-2);
        document.getElementById('id').value = vehicle_data[0].id;
//        document.getElementById('country_code1').value = vehicle_data[0].country_code1;
//        document.getElementById('country_code1').value = vehicle_data[0].country_code2;
    })
}

const submit_button_vehicle = document.getElementById("submit_button");

submit_button_vehicle.addEventListener("click", (event) => {
    event.preventDefault();
    create_and_update_vehicle();
})

function create_and_update_vehicle() {
    var plate_number1 = document.getElementById('plate_number1').value;
    var plate_number2 = document.getElementById('plate_number2').value;
    var empty_weight = document.getElementById('empty_weight').value;
    var empty_time = document.getElementById('empty_time').value;
    var id = document.getElementById('id').value;

    let data_to_send = {
        "plate_number1": plate_number1,
        "plate_number2": plate_number2,
        "empty_weight": empty_weight,
        "empty_time": empty_time,
        "id": id,
    }

    if (id === '') {
        fetch("http://localhost:3001/vehicles", {
            method: "POST",
            body: JSON.stringify(data_to_send),
            headers: {
                "Content-type": "application/json"
            }
        }).then( res => console.log( res))
    } else {
        fetch(`http://localhost:3001/vehicles/`, {
            method: "PUT",
            body: JSON.stringify(data_to_send),
            headers: {
                "Content-type": "application/json"
            }
        }).then( res => console.log( res))
    }
}


const delete_vehicle_button = document.getElementById("delete_button");

delete_vehicle_button.addEventListener("click", (event) => {
    event.preventDefault();
    delete_vehicle();
})

function delete_vehicle() {
    var id = document.getElementById('id').value;

    if (confirm("Biztos benne? Törli a rendszámot? "+ document.getElementById('plate_number1').value)) {
        fetch(`http://localhost:3001/vehicles/${id}`, {
            method: "DELETE"
        }).then( res=> { 
            console.log( res); 
            redirectToVehicleTable()
        });
    }    
}

function redirectToVehicleTable() {
    window.location.href = "vehicle_table.html";
  }
