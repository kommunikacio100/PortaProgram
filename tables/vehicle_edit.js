

const submit_button_vehicle = document.getElementById("submit_button");

submit_button_vehicle.addEventListener("click", (event) => {
    event.preventDefault();
    create_and_update_user();
})

function create_and_update_user() {
    var input_vehicle_platenumber_1 = document.getElementById('input_vehicle_platenumber_1').value;
    var input_vehicle_empty_weight = document.getElementById('input_vehicle_empty_weight').value;
    var input_vehicle_empty_weight_date = document.getElementById('input_vehicle_empty_weight_date').value;
    var input_vehicle_empty_weight_time = document.getElementById('input_vehicle_empty_weight_time').value;
    var input_vehicle_id = document.getElementById('input_vehicle_id').value;

    input_vehicle_empty_weight_date= input_vehicle_empty_weight_date +" "+ input_vehicle_empty_weight_time+":00";
    console.log(input_vehicle_empty_weight_date);
    
    let data_to_send = {
        "vehicle_plate_number1": input_vehicle_platenumber_1,
        "vehicle_empty_weight": input_vehicle_empty_weight,
        //"vehicle_empty_time": input_vehicle_empty_weight_date,
        //"user_can_edit_data": input_vehicle_empty_weight_time,
        "vehicle_id": input_vehicle_id,
        
    }

    if (input_vehicle_id === '') {
        fetch("http://localhost:3001/vehicles", {
            method: "POST",
            body: JSON.stringify(data_to_send),
            headers: {
                "Content-type": "application/json"
            }
        }).then( res => console.log( res))
    } else {
        fetch(`http://localhost:3001/vehicles/${input_vehicle_id}`, {
            method: "PUT",
            body: JSON.stringify(data_to_send),
            headers: {
                "Content-type": "application/json"
            }
        }).then( res => console.log( res))
    }
}