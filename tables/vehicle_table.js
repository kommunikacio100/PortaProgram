



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
        fetch("http://localhost:3001/vehicles", {
            method: "POST",
            body: JSON.stringify(data_to_send),
            headers: {
                "Content-type": "application/json"
            }
        }).then( res => console.log( res))
    } else {
        fetch(`http://localhost:3000/user/${input_user_id}`, {
            method: "PUT",
            body: JSON.stringify(data_to_send),
            headers: {
                "Content-type": "application/json"
            }
        }).then( res => console.log( res))
    }
}