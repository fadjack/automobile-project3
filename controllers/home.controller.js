
const util = require('util')
,     query = util.promisify(db.query).bind(db);

exports.getHomePage = (req, res) => {
  const userId =  req.session.user_id;
    let query = "SELECT * FROM cars"
    db.query(query, (err, result) => {
     //   console.log("result :", result)
        if (err) {
            res.redirect('/');
        }
        res.render('index.ejs', {
          userId,
            title: "Bienvenue",
            cars: result,

        });
    });
};
/*
exports.getcarSingle = (req, res) => {
    let car_id = req.params.id;
    const query = "SELECT * FROM `cars` WHERE car_id = '" + car_id + "' ";
    db.query(query, (err, result) => {
      // console.log(result[0]);
      if (err) {
        return res.status(500).send(err);
      }
      res.render('Pagesingle.ejs', { cars: result });
    })
  }
*/

exports.getcarSingle = async (req, res) => {
  const userId =  req.session.user_id;
  const fuelsList = await queryAsync("SELECT fuel_id, name FROM fuels")
  const categoriesList = await queryAsync("SELECT category_id, name FROM categories")
  const manufacturersList = await queryAsync("SELECT manufacturer_id, name FROM manufacturers")
  let car_id = req.params.id;
  let cars = await queryAsync("SELECT c.*, f.name AS carburant, cat.name AS categorie, fab.name AS fabricant FROM cars AS c join fuels AS f on c.fuel_id = f.fuel_id join categories AS cat on c.category_id = cat.category_id join manufacturers AS fab on c.manufacturer_id = fab.manufacturer_id  WHERE car_id = '" + car_id + "' ")
  res.render('Pagesingle.ejs', { cars: cars }), {
    userId,
    fuelsList,
    manufacturersList,
    categoriesList,
    cars: cars[0]


  };
}

   // module search
exports.search = async (req, res) => {
    const cars = await query("SELECT  *  FROM `cars`");
    try {
      res.status(201).json(cars);
    } catch (err) { throw err; }
  }
  