const cached_owner_Data = localStorage.getItem('data');

if (cached_owner_Data) {
    let felbontva = cached_owner_Data.split(",");

    document.getElementById('input_owner_vat_number').value = felbontva[0];
    document.getElementById('input_owner_name').value = felbontva[1];
    document.getElementById('input_owner_bank_account').value = felbontva[2];
    document.getElementById('input_owner_memo').value = felbontva[3];
    document.getElementById('input_owner_id').value = felbontva[4];
   
    localStorage.clear();
}

const submit_button_owner = document.getElementById("submit_button");

submit_button_owner.addEventListener("click", (event) => {
    event.preventDefault();
    create_and_update_user();
})

function create_and_update_user() {
 var input_owner_vat_number = document.getElementById('input_owner_vat_number').value;
 var input_owner_name = document.getElementById('input_owner_name').value;
 var input_owner_bank_account = document.getElementById('input_owner_bank_account').value;
 var input_owner_memo = document.getElementById('input_owner_memo').value;
 var input_owner_id = document.getElementById('input_owner_id').value;
 
    let data_to_send = {
        "id":  input_owner_id,
        "vat_number": input_owner_vat_number,
        "name": input_owner_name,
        "bank_account": input_owner_bank_account,
        "memo": input_owner_memo,
        
    }

    if (input_owner_id === '') {
        fetch("http://localhost:3001/owners", {
            method: "POST",
            body: JSON.stringify(data_to_send),
            headers: {
                "Content-type": "application/json"
            }
        }).then( res => console.log( res))
    } else {
        fetch(`http://localhost:3001/owners/${input_owner_id}`, {
            method: "PUT",
            body: JSON.stringify(data_to_send),
            headers: {
                "Content-type": "application/json"
            }
        }).then( res => console.log( res))
    }
}


const delete_owner_button = document.getElementById("delete_button");

delete_owner_button.addEventListener("click", (event) => {
    event.preventDefault();
    delete_user();
})




function delete_user() {
    var input_owner_id = document.getElementById('input_owner_id').value;

    fetch(`http://localhost:3001/owners/${input_owner_id}`, {
        method: "DELETE"
    })
 
      setTimeout(redirectToUserTable, 300);

   
   
}

function redirectToUserTable() {
    window.location.href = "owner_table.html";
  }
