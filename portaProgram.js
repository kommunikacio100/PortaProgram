
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const fs = require('fs');

// Adatbázis kapcsolat konfigurációja
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'WEIGHING_DB'
  });
  
const app = express();
app.use(bodyParser.json());


// Felhasználói adatok lekérdezése az adatbázisból
function getUsers() {
    connection.query( 'SELECT * FROM users', ( error, rows) =>{
        if (error) throw error;
        return JSON.stringify( rows);
    });
};

app.get('/introduction.html', (req, res) => { 
    const buffer = fs.readFileSync('introduction.html');
    const content = buffer.toString();
    res.send( content);
});


app.get('/', (req, res) => { 
    const buffer = fs.readFileSync('introduction.html');
    const content = buffer.toString();
    res.send( content);
});

app.get('/users', (req, res) => {
    var users = getUsers();
    res.send( users);
});

app.get('/addresses',( req, res) => {
    let sql = 'SELECT * FROM addresses';
    connection.query( sql, (error, results, fields) => {
        if (error) throw error;
        res.send(results);   
    });
});

app.post('/addresses',( req, res) => {
    const { 
       address_to_table, // bemeneti paraméter hogy melyik táblához tartozó címeket olvassa ki.
       address_to_id,   // melyik id-hez tartozókat olvassa ki,
       default_address  // csak az alapértelmezettet olvassa e ki.
    }= req.body;
    let sql = 'SELECT * FROM addresses where 1=1';
    if (address_to_table) {
        sql += ' and address_to_table= "${address_to_table}"';
    }
    if (address_to_id) {
        sql += ' and address_to_id= ${address_to_id}';
    }
    if (default_address){
        sql += ' and ${default_address}';
    }
    connection.query( sql, (error, results, fields) => {
        if (error) throw error;
        res.send(results);   
    });
});

app.get('/zip_codes',( req, res) => {
    connection.query('SELECT * FROM zip_codes LIMIT 5', (error, results, fields) => {
        if (error) throw error;
        res.send(results);   
    });
});

app.post('/zip_codes',( req, res) => {
    const { 
        zip_code, // ha csak arra az egy irányítószámra kérdez rá.
        city   // ha csak arra a településre kérdez rá.
     }= req.body;
     let sql = ' select * from zip_codes ';
     let condition = '';
     if (zip_code){
        condition = ' zip_code = ${zip_code} ';
     }
     if (city){

     }
     connection.query('SELECT * FROM zip_codes LIMIT 5', (error, results, fields) => {
        if (error) throw error;
        res.send(results);   
    });
});

// Szerver indítása
let port = 3001;
app.listen( port, () => {
    console.log('A szerver elindult a http://localhost:'+ port+ ' címen.');
  });

