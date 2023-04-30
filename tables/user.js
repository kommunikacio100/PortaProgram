let tbody = document.getElementById('tbody');

fetch('http://localhost:3000/user')
    .then (response => response.json())
    .then (datas => {
        // console.log(datas);
        datas.map(data => {
            // console.log(data);
            tbody.append(trFunction(data.user_name, data.user_email, data.user_can_look_data, data.user_can_edit_data, data.user_can_weighing, data.user_can_edit_users, data.user_can_settings, data.user_id))
        })
    })

function trFunction(user_name, user_email, user_can_look_data, user_can_edit_data, user_can_weighing, user_can_edit_users, user_can_settings, user_id) {
    let tr = document.createElement('tr');
    tr.innerHTML = 
    `
    <td class="user_name" style="font-weight: bold;">${user_name}</td>
    <td class="user_email">${user_email}</td>
    <td class="user_can_look_data">${user_can_look_data}</td>
    <td class="user_can_edit_data">${user_can_edit_data}</td>
    <td class="user_can_weighing">${user_can_weighing}</td>
    <td class="user_can_edit_users">${user_can_edit_users}</td>
    <td class="user_can_settings">${user_can_settings}</td>
    <td class="user_id">${user_id}</td>
    `
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
        "user_name" : input_user_name,
        "user_email" : input_user_email,
        "user_can_look_data" : input_user_can_look_data,
        "user_can_edit_data" : input_user_can_edit_data,
        "user_can_weighing" : input_user_can_weighing,
        "user_can_edit_users" : input_user_can_edit_users,
        "user_can_settings" : input_user_can_settings,
        "user_id" : input_user_id
    }

    if (input_user_id === '') {
        fetch("http://localhost:3000/user", {
            method: "POST",
            body: JSON.stringify(data_to_send),
            headers: {
                "Content-type" : "application/json"
            }
        })
    } else {
        fetch(`http://localhost:3000/user/${input_user_id}`, {
            method: "PUT",
            body: JSON.stringify(data_to_send),
            headers: {
                "Content-type" : "application/json"
            }
        })
    }
}

function delete_user() {
    var input_user_id = document.getElementById('input_user_id').value;

    fetch(`http://localhost:3000/user/${input_user_id}`, {
        method: "DELETE"
    })
}

const submit_button = document.getElementById("submit_button");
const delete_button = document.getElementById("delete_button");

submit_button.addEventListener("click", (event) => {
    event.preventDefault();
    create_and_update_user();
})
delete_button.addEventListener("click", (event) => {
    event.preventDefault();
    delete_user();
})