loginBtn = document.getElementById('loginBtn');
emailInput = document.getElementById('email');
passwordInput = document.getElementById('password');

loginBtn.addEventListener( 'click', (event)=> {
    event.preventDefault();
    email = emailInput.value;
    password= passwordInput.value;
    const data_to_send= {email:email, password:password};
    console.log( "datatosend ", data_to_send );
    fetch("http://localhost:3001/login", {
        method: "POST",
        body: JSON.stringify(data_to_send),
        headers: {
            "Content-type": "application/json"
    }
    })
    //.then(response => response.json())
    .then( json => {
        console.log( "json> ", json);
        if (json.jwt!=null){
            localStorage.setItem('user_id', json.id);
            localStorage.setItem('email', json.email);
            localStorage.setItem('jwt', json.jwt);
            window.location.href = "selector.html";
        }
    });
});
