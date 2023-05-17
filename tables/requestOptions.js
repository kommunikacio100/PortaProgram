
var authToken = localStorage.getItem( 'jwt');
const serverUrl = "http://127.0.0.1:3001";
const requestOptions = {
    method: 'GET', // vagy POST, PUT, DELETE, stb.
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}` // az auth token hozzáadása az Authorization header-hez
    }
  };
if (authToken==null) window.location.href = `/login.html`;


export {authToken, serverUrl, requestOptions};