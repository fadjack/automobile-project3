const express = require('express');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');
const path = require('path');
const app = express();
const session = require('express-session');

const port = 3000;



// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.set('port', process.env.port || port);
// app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());



// Express-session
app.use(session({
    secret: 'shhuuuuut',
    resave: false,
    saveUninitialized: true,
    name: 'biscuit',
    cookie: { maxAge: 60000 }
  }))

// MySQL
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'automobiles',
    port:'3307',
    multipleStatements: true
});

db.connect((err) => {
    if (err) { throw err;}
    console.log('Connecté à la base MySQL');
});
global.db = db;



// Controller
const carsRoutes = require('./routes/car.route');
const manufacturersRoutes = require('./routes/manufacturer.route');
const homeRoutes = require('./routes/home.route');
const authRoutes = require('./routes/auth.route');


// Middleware
const auth = require("./middleware/auth.middleware")


app.use('/car', carsRoutes);
app.use('/manufacturer', manufacturersRoutes);

// Front
app.use('/', homeRoutes);

// Authentification
app.use('/auth',  authRoutes);

app.get('*', function(req, res, next){
    res.status(404);
    res.render('404.ejs', {
        title: "Cette page n'existe pas.",
    });
});




// Admin
//const adminRoutes = require('./routes/admin.route');





// Admin
//app.use('/admin', auth,  adminRoutes);



// Listen
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});