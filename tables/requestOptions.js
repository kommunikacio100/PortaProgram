
const serverUrl = "http://127.0.0.1/3001";

const authToken = localStorage.getItem( 'jwt');

const requestOptions = {
    method: 'GET', // vagy POST, PUT, DELETE, stb.
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}` // az auth token hozzáadása az Authorization header-hez
    }
  };
