
const serverUrl= 'http://127.0.0.1:3001';

//import { authToken, serverUrl, requestOptions } from '/tables/requestOptions.js';

document.addEventListener('DOMContentLoaded', (event) => {
    let loginBtn;
    let emailInput;
    let passwordInput;
    //setTimeout( ()=> {
        loginBtn = document.getElementById('loginBtn');
        emailInput = document.getElementById('email');
        passwordInput = document.getElementById('password');
        loginBtn.addEventListener( 'click', (event)=> {
            event.preventDefault();
            let email = emailInput.value;
            let password= passwordInput.value;
            const data_to_send= {email:email, password:password};
            console.log( "datatosend ", data_to_send );
            fetch( serverUrl + "/login", {
                method: "POST",
                body: JSON.stringify(data_to_send),
                headers: {
                    "Content-type": "application/json"
            }
            })
            .then(response => response.json())
            .then( json => {
                console.log( "json> ", json);
                if (json.jwt!=null){
                    localStorage.setItem('user_id', json.id);
                    localStorage.setItem('email', json.email);
                    localStorage.setItem('jwt', json.jwt);
                    window.location.href = "tables/open_deliveryNotes_table.html";
                }else{
                    console.log("jwt not found!");
                }
            });
        });
    //}, 1000);
});              