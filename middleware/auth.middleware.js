module.exports = (req, res, next) => {
  const userId =  req.session.user_id;
  const roleId = req.session.role_id;

    const query = "SELECT * FROM `users` WHERE user_id = '" + req.session.user_id  + "' ";
    db.query(query, (err, result) => {
  
      // console.log(" auth : ", result);
    
if (userId !==  30 && roleId!== 1 ) {

  return res.status(403).json({message: `page reservée  à l'admin`});
  
}
        if (err) {
            res.send(err);
        }
        if (result == 0) {
          res.redirect('/auth/login')
        }
        next()
    });
  
  
  }