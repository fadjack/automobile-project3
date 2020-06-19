const express = require('express');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');
const path = require('path');
const app = express();
const session = require('express-session');

const port = 5000;

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.set('port', process.env.port || port);
// app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());


// MySQL
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'automobile',
    multipleStatements: true
});

db.connect((err) => {
    if (err) { throw err;}
    console.log('Connecté à la base MySQL');
});
global.db = db;

// Front
app.use('/', homeRoutes);

// Controller
const carsRoutes = require('./routes/car.route');
const manufacturerRoutes = require('./routes/manufacturer.route');
const homeRoutes = require('./routes/home');


app.use('/cars', carsRoutes);
app.use('/manufacturer', manufacturerRoutes);
app.get('*', function(req, res, next){
    res.status(404);
    res.render('404.ejs', {
        title: "Cette page n'existe pas.",
    });
});


// Listen
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});