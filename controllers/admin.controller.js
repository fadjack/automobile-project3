const fs = require('fs');

exports.getAdminPage = async (req, res) => {

  const cars = await queryAsync(`
  SELECT 
    c.car_id,
    c.name,
    c.content,
    c.price,
    c.kilometre,
    c.color,
    c.year,
    c.image,
    f.name AS carburant,
    cat.name AS catégorie,
    m.name AS fabricant,
    DATE_FORMAT(c.created_at,  "%d/%m/%Y") AS created_at  
FROM
    cars AS c
        JOIN
    fuels AS f ON c.fuel_id = f.fuel_id
        JOIN
    categories AS cat ON c.category_id = cat.category_id
        JOIN
    manufacturers AS m ON c.manufacturer_id = m.manufacturer_id
ORDER BY created_at DESC

                                 `)


  const users = await queryAsync("SELECT * FROM users ORDER BY user_id ASC")
  const totalUsers = await queryAsync("SELECT COUNT(*) AS count FROM users")
  const totalcars = await queryAsync("SELECT COUNT(*) AS count FROM cars")

  try {
    res.render('admin/dashboard',
      {
        title: "Bienvenue",
        cars,
        users,
        totalUsers,
        totalcars: totalcars[0].count,
        //users: result[1],
        totalUsers: totalUsers[0].count,
        //username: req.session.username,
        breadcrumb: "Tableau de bord"

      });
  } catch (err) {
    throw err
  }


};
exports.getAdminCarsAdd = async (req, res) => {

  const fuelsList = await queryAsync("SELECT fuel_id, name FROM fuels")
  const categoriesList = await queryAsync("SELECT category_id, name FROM categories")
  const manufacturersList = await queryAsync("SELECT manufacturer_id, name FROM manufacturers")


  res.render('admin/addcar.ejs', {
    title: "Ajouter une voiture",
    fuelsList,
    categoriesList,
    manufacturersList,


  });
};

exports.postAdminCarsAdd = (req, res) => {
  if (!req.files) {
    return res.status(400).send("Pas de fichier envoyé");
  }
  let name = req.body.name;
  let content = req.body.content;
  let price = req.body.price;
  //let image = req.body.image;
  let kilometre = req.body.kilometre;
  let color = req.body.color;
  let year = req.body.year;
  let uploadedFile = req.files.image;
  let fuel_id = req.body.fuel_id;
  let manufacturer_id = req.body.manufacturer_id;
  let category_id = req.body.category_id;
  let image = uploadedFile.name;
  let fileExtension = uploadedFile.mimetype.split('/')[1];
  image = name + Date.now() + '.' + fileExtension;



  if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/jpg') {
    uploadedFile.mv(`public/images/360degree-cars/${image}`, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      let query = "INSERT INTO `cars` (name, content, price, image, kilometre, color, year,   manufacturer_id, fuel_id, category_id) VALUES ('" +
        name + "', '" + content + "', '" + price + "', '" + image + "', '" + kilometre + "', '" + color + "','" + year + "',  '" + manufacturer_id + "', '" + fuel_id + "', '" + category_id + "')";
      db.query(query, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.redirect('/admin');
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

// GET - Affiche la page pour éditer une voiture 
exports.editcarPage = async (req, res) => {
  const fuelsList = await queryAsync("SELECT fuel_id, name FROM fuels")
  const categoriesList = await queryAsync("SELECT category_id, name FROM categories")
  const manufacturersList = await queryAsync("SELECT manufacturer_id, name FROM manufacturers")
  let car_id = req.params.id;
  let cars = await queryAsync("SELECT c.*, f.name AS carburant, cat.name AS categorie, fab.name AS fabricant FROM cars AS c join fuels AS f on c.fuel_id = f.fuel_id join categories AS cat on c.category_id = cat.category_id join manufacturers AS fab on c.manufacturer_id = fab.manufacturer_id  WHERE car_id = '" + car_id + "' ")

  res.render('admin/editcar.ejs', {
    title: "Editer une voiture",
    fuelsList,
    manufacturersList,
    categoriesList,
    cars: cars[0]


  });
}

// PUT - Editer une voiture 
exports.editcar = (req, res) => {
  let car_id = req.params.id;
  let name = req.body.name;
  let content = req.body.content;
  let price = req.body.price;
  let kilometre = req.body.kilometre;
  let color = req.body.color;
  let year = req.body.year;
   let uploadedFile = req.files.image;
  let fuel_id = req.body.fuel_id;
  let manufacturer_id = req.body.manufacturer_id;
  let category_id = req.body.category_id
  let image = uploadedFile.name;
  let fileExtension = uploadedFile.mimetype.split('/')[1];
  image = name + Date.now() + '.' + fileExtension;


  if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/jpg') {
    uploadedFile.mv(`public/images/360degree-cars/${image}`, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
console.log(car_id);
      let query = "UPDATE `cars` SET `name` = '" + name + "', `content` = '" + content + "', `price` = '" + price + "', `kilometre` = '" + kilometre + "', `color` = '" + color + "',`year` = '" + year + "', `fuel_id` = '" + fuel_id + "', `manufacturer_id` = '" + manufacturer_id + "', `category_id` = '" + category_id + "',`image` = '" + image + "' WHERE `cars`.`car_id` = '" + car_id + "'";

      db.query(query, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.redirect('/admin');
      });
    });
  };
}


exports.deletecar = (req, res) => {
  let car_id = req.params.id;
  let getImageQuery = 'SELECT image from `cars` WHERE car_id = "' + car_id + '"';
  let deleteUserQuery = 'DELETE FROM cars WHERE car_id = "' + car_id + '"';

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
              res.redirect('/admin');
          });
      });  const userId =  req.session.user_id;
  });
}

