const express = require('express');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');
const path = require('path');
const app = express();
const session = require('express-session');
const util = require('util')


const port = 3000;



// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


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
  cookie: {
    maxAge: 24 * 60 * 60 * 7 * 1000
  }
}))

// MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'automobiles',
  port: '3307',

});

db.connect((err) => {
  if (err) { throw err; }
  console.log('Connecté à la base MySQL');
});
global.db = db;
const queryAsync = util.promisify(db.query).bind(db)
global.queryAsync = queryAsync



// Controller
// Auth
const authRoutes = require('./routes/auth.route');

// Admin
const adminRoutes = require('./routes/admin.route');

// Front
const carsRoutes = require('./routes/car.route');
const manufacturersRoutes = require('./routes/manufacturer.route');
const homeRoutes = require('./routes/home.route');

// Middleware
const auth = require("./middleware/auth.middleware")
const userRoute = require("./routes/user.route")

// Authentification
app.use('/auth', authRoutes);

// Admin
app.use('/admin',auth ,adminRoutes);

//User

app.use('/user',userRoute )


// cars
//app.use('/car', carsRoutes)

// Front
app.use('/manufacturer', manufacturersRoutes);
app.use('/', homeRoutes);

// Erreur 404
//app.get('*', function(req, res, next){
// res.status(404);
//res.render('404.ejs', {
//    title: "Cette page n'existe pas.",
//  });
//});



// Listen
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});