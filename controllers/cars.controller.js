/*const fs = require('fs');

exports.addcarPage = (req, res) => {

    let query = "SELECT * FROM `cars` ORDER BY name ASC"; 

    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }

        res.render('admin/addcar.ejs', {
            title: "Ajouter une voiture",
            cars: result
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
  let kilometre = req.body.kilometre;
  let couleur = req.body.couleur;
  let categorie = req.body.categorie;
  let fabricant = req.body.fabricant;
  let uploadedFile = req.files.image;
  let image = uploadedFile.name;
  let fileExtension = uploadedFile.mimetype.split('/')[1];
  image = '/images/360degree-cars/' + name + Date.now() + '.' + fileExtension;
  console.log("image,", image);
//  let manufacturer = req.body.manufacturer;
  
  
      if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
        uploadedFile.mv(`public/images/360degree-cars/${image}`, (err ) => {
            if (err) {
                return res.status(500).send(err);
            }
            let query = "INSERT INTO `cars` (name,content, price, image, kilometre,couleur,categorie, fabricant) VALUES ('" +
            name + "', '" + content + "', '" + price + "', '" + image + "', '" + kilometre + "', '" + couleur + "', '" + categorie + "' '" + fabricant + "')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
        });
    } else {
        message = "Fichier image invalide";
        res.render('admin/addcar.ejs', {
            message,
            title: "Ajouter une voiture"
        });
    }
  }

  exports.editcarPage = (req, res) => {
    let carId = req.params.id;
    let query = "SELECT * FROM `cars` WHERE car_id = '" + carId + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('admin/editcar.ejs', {
            title: "Editer une voiture",
            cars: result[0],
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
      fs.unlink(`public/images/360degree-cars/${image}`, (err) => {
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
}*/