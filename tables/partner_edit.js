const cached_partner_Data = localStorage.getItem('data');

if (cached_partner_Data) {
    let felbontva = cached_partner_Data.split(",");

    document.getElementById('input_partner_vat_number').value = felbontva[0];
    document.getElementById('input_partner_name').value = felbontva[1];
    document.getElementById('input_partner_bank_account').value = felbontva[2];
    document.getElementById('input_partner_memo').value = felbontva[3];
    document.getElementById('input_partner_id').value = felbontva[4];
   
    localStorage.clear();
}

const submit_button_partner = document.getElementById("submit_button");

submit_button_partner.addEventListener("click", (event) => {
    event.preventDefault();
    create_and_update_user();
})

function create_and_update_user() {
 var input_partner_vat_number = document.getElementById('input_partner_vat_number').value;
 var input_partner_name = document.getElementById('input_partner_name').value;
 var input_partner_bank_account = document.getElementById('input_partner_bank_account').value;
 var input_partner_memo = document.getElementById('input_partner_memo').value;
 var input_partner_id = document.getElementById('input_partner_id').value;
 
    let data_to_send = {
        "id":  input_partner_id,
        "vat_number": input_partner_vat_number,
        "name": input_partner_name,
        "memo": input_partner_memo,
        "bank_account": input_partner_bank_account,
         
    }

    if (input_partner_id === '') {
        fetch("http://localhost:3001/partners", {
            method: "POST",
            body: JSON.stringify(data_to_send),
            headers: {
                "Content-type": "application/json"
            }
        }).then( res => console.log( res))
    } else {
        fetch(`http://localhost:3001/partners/${input_partner_id}`, {
            method: "PUT",
            body: JSON.stringify(data_to_send),
            headers: {
                "Content-type": "application/json"
            }
        }).then( res => console.log( res))
    }
}


const delete_partner_button = document.getElementById("delete_button");

delete_partner_button.addEventListener("click", (event) => {
    event.preventDefault();
    delete_user();
})




function delete_user() {
    var input_partner_id = document.getElementById('input_partner_id').value;

    fetch(`http://localhost:3001/partners/${input_partner_id}`, {
        method: "DELETE"
    })
 
      setTimeout(redirectToUserTable, 300);

   
   
}

function redirectToUserTable() {
    window.location.href = "partner_table.html";
  }
