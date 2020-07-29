exports.getuserpage = (req, res) => {
  const userId =  req.session.user_id;
  //let user_id = req.session.user_id
  //console.log("user id :", req.session.user_id);
  const  query = "SELECT * FROM users WHERE  `user_id` =  '" + userId + "'";
    db.query(query, (err, result) => {
      //console.log(result);
   
        if (err) {
          return res.status(500).send(err);
        }
       // console.log(user_id);
        res.render('user/dashboard.ejs', {
         users: result,
         userId
        });
    
      });
    }

   
    
    exports.postuserpage = (req, res) => {
     let username = req.body.username;
      let email = req.body.email;
      let password = req.body.password;
          let query = "UPDATE `users` SET `usermane` = '" + username + "', `email` = '" + email + "', `password` = '" + password + "', WHERE `users`.`user_id` = '" + req.params.id + "'"
    
          db.query(query, (err, result) => {
            if (err) {
              return res.status(500).send(err);
            }
            res.redirect('/user/dashboard/' + req.session.user_id);
          });
       
      };
    
    
