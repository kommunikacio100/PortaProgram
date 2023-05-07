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

