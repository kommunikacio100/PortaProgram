const cachedData = localStorage.getItem('data');

if (cachedData) {
    let felbontva = cachedData.split(",");


    document.getElementById('input_user_name').value = felbontva[0];
    document.getElementById('input_user_email').value = felbontva[1];
    document.getElementById('input_user_can_look_data').value = felbontva[2];
    document.getElementById('input_user_can_edit_data').value = felbontva[3];
    document.getElementById('input_user_can_weighing').value = felbontva[4];
    document.getElementById('input_user_can_edit_users').value = felbontva[5];
    document.getElementById('input_user_can_settings').value = felbontva[6];
    document.getElementById('input_user_id').value = felbontva[7];


    localStorage.clear();


}

const submit_button = document.getElementById("submit_button");

submit_button.addEventListener("click", (event) => {
    event.preventDefault();
   

    create_and_update_user();
})


function create_and_update_user() {
    var input_user_name = document.getElementById('input_user_name').value;
    var input_user_email = document.getElementById('input_user_email').value;
    var input_user_password = document.getElementById('input_user_password').value;
    var input_user_can_look_data = document.getElementById('input_user_can_look_data').value;
    var input_user_can_edit_data = document.getElementById('input_user_can_edit_data').value;
    var input_user_can_weighing = document.getElementById('input_user_can_weighing').value;
    var input_user_can_edit_users = document.getElementById('input_user_can_edit_users').value;
    var input_user_can_settings = document.getElementById('input_user_can_settings').value;
    var input_user_id = document.getElementById('input_user_id').value;

    input_user_can_look_data == "IGEN" ? input_user_can_look_data = 1 :  input_user_can_look_data = 0;
    input_user_can_edit_data == "IGEN" ? input_user_can_edit_data = 1 :  input_user_can_edit_data = 0;
    input_user_can_weighing == "IGEN" ? input_user_can_weighing = 1 :  input_user_can_weighing = 0;
    input_user_can_edit_users == "IGEN" ? input_user_can_edit_users = 1 :  input_user_can_edit_users = 0;
    input_user_can_settings == "IGEN" ? input_user_can_settings = 1 :  input_user_can_settings = 0;
    
    let data_to_send = {
        "name": input_user_name,
        "email": input_user_email,
        "password": input_user_password,
        "can_look_data": input_user_can_look_data,
        "can_edit_data": input_user_can_edit_data,
        "can_weighing": input_user_can_weighing,
        "can_edit_users": input_user_can_edit_users,
        "can_settings": input_user_can_settings,
        "id": input_user_id
    }

    if (input_user_id === '') {
        console.log( 'POST', data_to_send);
        fetch("http://localhost:3001/users", {
            method: "POST",
            body: JSON.stringify(data_to_send),
            headers: {
                "Content-type": "application/json; charset = UTF-8",
                "Access-Control-Allow-Origin":"*"
            }
        }).then( res=> {console.log(); return res.json();} ).then( json => console.log( json));
        
    } else {
        console.log( 'PUT', data_to_send);
        fetch("http://127.0.0.1:3001/users", {
            method: "PUT",
            body: JSON.stringify(data_to_send),
            headers: {
                "Content-type": "application/json; charset = UTF-8",
                "Access-Control-Allow-Origin":"*"
            }
        }).then( res=> res.json() ).then( json => console.log( json));
    }
}


