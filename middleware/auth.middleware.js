module.exports = (req, res, next) => {

    const query = "SELECT * FROM `users` WHERE id = '" + req.session.userId  + "' ";
    db.query(query, (err, result) => {
  
      // console.log(" auth : ", result);
    
        if (err) {
            res.send(err);
        }
        if (result == 0) {
          res.redirect('/auth/login')
        }
        next()
    });
  
  
  }