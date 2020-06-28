const fs = require('fs');

exports.addcarPage = (req, res) => {

    let query = "SELECT * FROM `manufacturer` ORDER BY name ASC"; 

    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }

        res.render('add-car.ejs', {
            title: "Ajouter une voiture",
            manufacturers: result
        });
    });
};

exports.addcar = (req, res) => {
  if (!req.files) {
      return res.status(400).send("Pas de fichier envoyé");
  }



  let name = req.body.name;
  let content = req.body.content;
  let price = req.body.price;
  //let image = req.body.image;
  let kilometre = q.body.kilometre
  let uploadedFile = req.files.image;
  let image = uploadedFile.name;
  let fileExtension = uploadedFile.mimetype.split('/')[1];
  image = name + '-'  + fileExtension;
  let manufacturer = req.body.manufacturer;
  
      if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
        uploadedFile.mv(`public/images/360degree-cars/${image}`, (err ) => {
            if (err) {
                return res.status(500).send(err);
            }
            let query = "INSERT INTO `cars` (name,content, price, image, kilometre, manufacturer_id) VALUES ('" +
            name + "', '" + content + "', '" + price + "', '" + image + "', '" + kilometre + "', '" + manufacturer + "')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
        });
    } else {
        message = "Fichier image invalide";
        res.render('add-car.ejs', {
            message,
            title: "Ajouter un constructeur"
        });
    }
  }

  exports.editcarPage = (req, res) => {
    let carId = req.params.id;
    let query = "SELECT * FROM `cars` WHERE id = '" + carId + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('edit-car.ejs', {
            title: "Editer un constructeur",
            car: result[0],
        });
    });
}
exports.editcar = (req, res) => {
let carId = req.params.id;
let name = req.body.name;
let content = req.body.content;
let price = req.body.price;
let kilometre = req.body.kilometre;


         let query = "UPDATE `cars` SET `name` = '" + name + "', `content` = '" + content + "', `price` = '" + price + "', `kilometre` = '" + kilometre + "' WHERE `cars`.`id` = '" + carId + "'";

          db.query(query, (err, result) => {
              if (err) {
                  return res.status(500).send(err);
              }
              res.redirect('/');
          });
     
  
}



exports.deletecar = (req, res) => {
  let carId = req.params.id;
  let getImageQuery = 'SELECT image from `cars` WHERE id = "' + carId + '"';
  let deleteUserQuery = 'DELETE FROM cars WHERE id = "' + carId + '"';

  db.query(getImageQuery, (err, result) => {
      if (err) {
          return res.status(500).send(err);
      }

      let image = result[0].image;

      fs.unlink(`public/assets/img/${image}`, (err) => {
          if (err) {
              return res.status(500).send(err);
          }
          db.query(deleteUserQuery, (err, result) => {
              if (err) {
                  return res.status(500).send(err);
              }
              res.redirect('/');
          });
      });
  });
}