const bcrypt = require("bcrypt");

// Get
exports.loginPage = (req, res) => {
  const userId =  req.session.user_id;
  res.render('auth/login', {
    userId, 
    title: "Page de connexion",
  });
};

exports.registerPage = (req, res) => {
  const userId =  req.session.user_id;
  res.render('auth/register', {
    userId,
    title: "S'inscrire",
  });
};

// Post
exports.register = (req, res) => {
  let username = req.body.username;
  let role_id = 2;
 // let role_id = req.body.role_id;
  let email = req.body.email;
  let password = req.body.password;

  let emailQuery = "SELECT email FROM users WHERE email = '" + email + "'";


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
          "INSERT INTO `users` (username,role_id,email, password) VALUES ('" + username +"', '" + role_id +"', '" + email +"', '" + hash +"')";

        db.query(query, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.redirect('/auth/login')
        //  res.redirect("/");
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

  db.query('SELECT email, password  FROM users WHERE email= ?', [email], (err, result) => {

   // console.log("result :", result);

    if (err || result.length === 0) {   
         
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

          db.query('SELECT user_id , email, username, password,role_id FROM users WHERE email = ? AND password = ?', [email, result[0].password], function (err, results) {

            if (results.length) {
              req.session.loggedin = true;
              req.session.username = results[0].username;
              req.session.user_id = results[0].user_id;
              req.session.role_id = results[0].role_id;
              console.log("user_id", req.session)
              // console.log(req.session.role_id);
          //  res.send("vous etes connecté")
              res.redirect('/user/dashboard/' + req.session.user_id);
              //res.redirect('/user/deconnexion.ejs/' + req.session.user_id);

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


// logout

exports.logout = (req, res) => {
  req.session.destroy( (err) => {
    if(err){
       console.log(err);
    }else{
        res.redirect('/auth/login');
    }
 });

  
};