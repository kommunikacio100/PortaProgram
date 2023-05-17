
import { authToken, serverUrl, requestOptions } from './requestOptions.js';

let tbody = document.getElementById('tbody');

fetch( serverUrl+ '/users', requestOptions)
    .then(response => response.json())
    .then(datas => {
        // console.log(datas);
        
        datas.map(data => {
            // console.log(data);
            tbody.append(trFunction(data.name, data.email, data.can_look_data, 
                data.can_edit_data, data.can_weighing, data.can_edit_users, data.can_settings, data.id))
        })
    })

function trFunction(user_name, user_email, user_can_look_data, 
        user_can_edit_data, user_can_weighing, user_can_edit_users, user_can_settings, user_id) {
    
    user_can_look_data == 1 ? user_can_look_data = "IGEN" : user_can_look_data = "NEM";
    user_can_edit_data == 1 ? user_can_edit_data = "IGEN" : user_can_edit_data = "NEM";
    user_can_weighing == 1 ? user_can_weighing = "IGEN" : user_can_weighing = "NEM";
    user_can_edit_users == 1 ? user_can_edit_users = "IGEN" : user_can_edit_users = "NEM";
    user_can_settings == 1 ? user_can_settings = "IGEN" : user_can_settings = "NEM";


    let tr = document.createElement('tr');
    tr.innerHTML =
        `
    <td  class="user_name" style="font-weight: bold;">${user_name}</td>
    <td class="user_email">${user_email}</td>
    <td class="user_can_look_data">${user_can_look_data}</td>
    <td class="user_can_edit_data">${user_can_edit_data}</td>
    <td class="user_can_weighing">${user_can_weighing}</td>
    <td class="user_can_edit_users">${user_can_edit_users}</td>
    <td class="user_can_settings">${user_can_settings}</td>
    <td class="user_id">${user_id}</td>
    `

    tr.ondblclick = function (event) {
        
        myEditFunction(event);

    }
    return tr;
}

function create_and_update_user() {
    var input_user_name = document.getElementById('input_user_name').value;
    var input_user_email = document.getElementById('input_user_email').value;
    var input_user_can_look_data = document.getElementById('input_user_can_look_data').value;
    var input_user_can_edit_data = document.getElementById('input_user_can_edit_data').value;
    var input_user_can_weighing = document.getElementById('input_user_can_weighing').value;
    var input_user_can_edit_users = document.getElementById('input_user_can_edit_users').value;
    var input_user_can_settings = document.getElementById('input_user_can_settings').value;
    var input_user_id = document.getElementById('input_user_id').value;

    let data_to_send = {
        "user_name": input_user_name,
        "user_email": input_user_email,
        "user_can_look_data": input_user_can_look_data,
        "user_can_edit_data": input_user_can_edit_data,
        "user_can_weighing": input_user_can_weighing,
        "user_can_edit_users": input_user_can_edit_users,
        "user_can_settings": input_user_can_settings,
        "user_id": input_user_id
    }

    if (input_user_id === '') {
        fetch( serverUrl+ "/user", {
            method: "POST",
            body: JSON.stringify(data_to_send),
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${authToken}` // az auth token hozzáadása az Authorization header-hez
            }
        }).then( res => console.log( res))
    } else {
        fetch( serverUrl+ `/user/${input_user_id}`, {
            method: "PUT",
            body: JSON.stringify(data_to_send),
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${authToken}` // az auth token hozzáadása az Authorization header-hez
            }
        }).then( res => console.log( res))
    }
}

function delete_user() {
    var input_user_id = document.getElementById('input_user_id').value;

    fetch( serverUrl+ `/user/${input_user_id}`, {
        method: "DELETE",
        'Authorization': `Bearer ${authToken}` // az auth token hozzáadása az Authorization header-hez
    })
}

//const submit_button = document.getElementById("gomb_uj_letrehozasa");
//const delete_button = document.getElementById("delete_button");
/*
submit_button.addEventListener("click", (event) => {
    event.preventDefault();
   

   // create_and_update_user();
})

*/

/*
delete_button.addEventListener("click", (event) => {
    event.preventDefault();
    delete_user();
})
*/



function myEditFunction(event) {

    let td = event.target;

    let tr = td.parentNode;

    let adatok = tr.outerText.split("\t");

    localStorage.setItem('data', adatok);
    window.location.href = `user_edit.html`;
}