const cached_carrier_Data = localStorage.getItem('data');

if (cached_carrier_Data) {
    let felbontva = cached_carrier_Data.split(",");

    document.getElementById('input_carrier_ekaer_id').value = felbontva[0];
    document.getElementById('input_carrier_name').value = felbontva[1];
    document.getElementById('input_carrier_memo').value = felbontva[2];
    document.getElementById('input_carrier_id').value = felbontva[3];
   
    localStorage.clear();
}

const submit_button_carrier = document.getElementById("submit_button");

submit_button_carrier.addEventListener("click", (event) => {
    event.preventDefault();
    create_and_update_user();
})

function create_and_update_user() {
 var input_carrier_ekaer_id = document.getElementById('input_carrier_ekaer_id').value;
 var input_carrier_name = document.getElementById('input_carrier_name').value;
 var input_carrier_memo = document.getElementById('input_carrier_memo').value;
 var input_carrier_id = document.getElementById('input_carrier_id').value;
 
    let data_to_send = {
        "id":  input_carrier_id,
        "ekaer_id": input_carrier_ekaer_id,
        "name": input_carrier_name,
        "memo": input_carrier_memo,
         
    }

    if (input_carrier_id === '') {
        fetch("http://localhost:3001/carriers", {
            method: "POST",
            body: JSON.stringify(data_to_send),
            headers: {
                "Content-type": "application/json"
            }
        }).then( res => console.log( res))
    } else {
        fetch(`http://localhost:3001/carriers/${input_carrier_id}`, {
            method: "PUT",
            body: JSON.stringify(data_to_send),
            headers: {
                "Content-type": "application/json"
            }
        }).then( res => console.log( res))
    }
}


const delete_carrier_button = document.getElementById("delete_button");

delete_carrier_button.addEventListener("click", (event) => {
    event.preventDefault();
    delete_user();
})




function delete_user() {
    var input_carrier_id = document.getElementById('input_carrier_id').value;

    fetch(`http://localhost:3001/carriers/${input_carrier_id}`, {
        method: "DELETE"
    })
 
      setTimeout(redirectToUserTable, 300);

   
   
}

function redirectToUserTable() {
    window.location.href = "carrier_table.html";
  }
