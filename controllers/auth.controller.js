const bcrypt = require("bcrypt");

// Get
exports.loginPage = (req, res) => {
  res.render('auth/login', {
    title: "Page de connexion",
  });
};

exports.registerPage = (req, res) => {
  res.render('auth/register', {
    title: "S'inscrire",
  });
};

// Post
exports.register = (req, res) => {

  let username = req.body.username;
  let role = req.body.role;
  let status = req.body.status;
  let email = req.body.email;
  let password = req.body.password;

  let emailQuery = "SELECT * FROM `users` WHERE email = '" + email + "'";

  db.query(emailQuery, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length > 0) {
      message = "Le compte existe déjà";
      res.redirect("/auth/register", {
        message,
        title: "Ajouter un utilisateur",
      });
    } else {

      bcrypt.hash(password, 10, function (err, hash) {

        let query =
          "INSERT INTO `users` (username,role,status,email, password) VALUES ('" +
          username +
          "', '" +
          role +
          "', '" +
          status +
          "', '" +
          email +
          "', '" +
          hash +
          "')";

        db.query(query, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.redirect("/");
        });
      }
      );
    }
  })
}

// Login

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query('SELECT * FROM users WHERE email= ?', [email], (err, result) => {

    if (err || result.length === 0) {   
      console.log("result :", result);
         
      return res.status(401).json({
        error: `Vous n'êtes pas inscrit`
      });
    } else {

      bcrypt.compare(password, result[0].password, (err, success) => {
        if (err) {
          return res.status(401).json({
            error: `Bcrypt Auth failed`
          });
        }
        if (success) {

          db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, result[0].password], function (err, results) {

            if (results.length) {
              req.session.loggedin = true;
              req.session.username = result[0].username;
              req.session.userId = result[0].id;


              res.redirect('/');

              console.log("req.session :", req.session)
              
            } else {
              res.send('Email ou mot de passe incorrect !');
            }
          });
        } else {
          res.send('Ajouter un email ou un mot de passe !');
        }
      })
    }
  })
};



exports.logout = (req, res) => {
  req.session.destroy( (err) => {
    if(err){
       console.log(err);
    }else{
        res.redirect('/auth/login');
    }
 });

  
};