
const express = require('express');
const fs = require('fs');
const port = 3001;

const app = express();
app.use( express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});


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

const addressesRouter = require('./routes/addresses.js');
const carriersRouter = require('./routes/carriers.js');
const countriesRouter = require('./routes/countries.js');
const delivery_notesRouter = require('./routes/delivery_notes.js');
const emailsRouter = require('./routes/emails.js');
const measurement_typesRouter = require('./routes/measurement_types.js');
const measurementsRouter = require('./routes/measurements.js');
const movementsRouter = require('./routes/movements.js');
const nationality_marksRouter = require('./routes/nationality_marks.js');
const ownersRouter = require('./routes/owners.js');
const partnersRouter = require('./routes/partners.js');
const phonesRouter = require('./routes/phones.js');
const productsRouter = require('./routes/products.js');
const street_typesRouter = require('./routes/street_types.js');
const usersRouter = require('./routes/users.js');
const vehiclesRouter = require('./routes/vehicles.js');
const zip_codesRouter = require('./routes/zip_codes.js');

app.use('/addresses', addressesRouter);
app.use('/carriers', carriersRouter);
app.use('/countries', countriesRouter);
app.use('/delivery_notes', delivery_notesRouter);
app.use('/emails', emailsRouter);
app.use('/measurement_types', measurement_typesRouter);
app.use('/measurements', measurementsRouter);
app.use('/movements', movementsRouter);
app.use('/nationality_marks', nationality_marksRouter);
app.use('/owners', ownersRouter);
app.use('/partners', partnersRouter);
app.use('/products', productsRouter);
app.use('/phones', phonesRouter);
app.use('/street_types', street_typesRouter);
app.use('/users', usersRouter);
app.use('/vehicles', vehiclesRouter);
app.use('/zip_codes', zip_codesRouter);


// Szerver indítása
app.listen( port, () => {
    console.log('A szerver elindult a http://localhost:'+ port+ ' címen.');
  });

