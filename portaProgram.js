
const express = require('express');
const mongoose = require('mongoose');
const restify = require('express-restify-mongoose');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const fs = require('fs');
const port = 3001;

// Adatbázis kapcsolat konfigurációja
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'WEIGHING_DB'
  });
  
const app = express();
app.use(bodyParser.json());
//restify.serve(app, connection);

mongoose.connect('mysql://localhost:3306/weighing_db')

restify.serve(router, mongoose.model('Customer', new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String }
})))

app.use(router)
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


// Szerver indítása
app.listen( port, () => {
    console.log('A szerver elindult a http://localhost:'+ port+ ' címen.');
  });

