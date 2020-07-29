
use automobile;
CREATE TABLE cars (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
	content VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    kilometre INT(255) NOT NULL,
    fuel_id INTEGER  NOT NULL,
    FOREIGN KEY(carburant_id ) REFERENCES fuel(id),
    category_id INTEGER NOT NULL,
	FOREIGN KEY(category_id ) REFERENCES category(id),
    manufacturer_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(manufacturer_id) REFERENCES manufacturer(id)
);
use automobile ;
create table manufacturer
(id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL);

    use automobile ;
create table fuel
(id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL);

    use automobile ;
create table category
(id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL);
CREATE TABLE roles
(
    role_id  INT auto_increment PRIMARY KEY NOT NULL,
    name VARCHAR(100) not null
 
)

use automobiles ;
create table users
(user_id INT AUTO_INCREMENT primary key NOT NULL,
username VARCHAR (255) NOT NULL,
role_id int(11) NOT NULL,
foreign key(role_id) references roles(role_id),
status VARCHAR(255) NOT NULL,
email VARCHAR (100) unique  not NULL,
password VARCHAR(50) not null);

USE automobile ;
INSERT INTO carburant (name) VALUES ('Diesel'),('Essence'),('Hybride');

USE automobile ;
INSERT INTO category (name)
 VALUES ('4x4,Suv '),('Citadine'),('Coupé'),('Sans permis');

 USE automobile ;
INSERT INTO manufacturer(name) 
 VALUES ('Renault '),('Clio'),('Peugeot'),('Open'),('Cabriolet'),('Twingo'),('Volvo');

 USE automobile;
INSERT INTO cars (name,content, price, image, kilometre,carburant_id,category_id, manufacturer_id)
 VALUES ('Renault',' toutes options état neuf','120000 ','https://image.lacentrale.fr/260x195','40000','1',2,'3');

 USE automobile ;
INSERT INTO users (username,email,password) VALUES ('adeline'),('adeline@gmail.com'),('123');

CREATE TABLE roles
(
role_id  INT auto_increment PRIMARY KEY NOT NULL,
name VARCHAR(100) not null
 
)

use automobiles;
INSERT INTO roles(role_id, name)
 VALUES
 (' 1', 'admin'),
 (' 2', 'member')

 use automobiles ;
alter table messages
add user_id int not null,
add foreign key(user_id) references users(user_id)


  use automobiles;
SELECT c.cars_id, c.name, c.content, c.price, c.kilometre, f.name AS  carburant
FROM cars AS c
JOIN fuels AS f ON c.cars_id = f.fuel_id

 SELECT c.cars_id, c.name, c.content, c.price, c.kilometre, f.name AS  carburant, cat.name AS category,fab.name AS fabricant FROM cars AS c JOIN fuels AS f ON c.cars_id = f.fuel_id JOIN categories AS cat ON c.cars_id = cat.category_id JOIN manufacturers AS fab ON c.cars_id = fab.id
 

 exports.addmanufacturerpage = (req,res) => {res.render('admin/add-manufacturer')};
  exports.addmanufacturer = (req,res) => {res.render('admin/add-manufacturer')};
  //exports.productsAddPage = (req, res) => { res.render('admin/productAdd', { title: "Ajouter une création", }); };

  
  use automobiles;
SELECT c.cars_id, c.name, c.content, c.price, c.kilometre, f.name AS  carburant, cat.name AS category
FROM cars AS c
JOIN fuels AS f ON c.cars_id = f.fuel_id
JOIN categories AS cat ON c.cars_id = cat.category_id

 //pour effacer le row
 delete from users 


 


//pour faire les jointures table cars avec les autres tables

SELECT c.cars_id, c.name, c.content, c.price, f.name AS carburant, cat.name AS catégorie, fab.name AS fabricant, ut.username AS utilisateur FROM cars AS c
JOIN fuels AS f ON c.fuel_id = f.fuel_id
JOIN categories AS cat ON c.category_id = cat.category_id
JOIN manufacturers AS fab ON fab.id = fab.id 
JOIN users AS ut ON ut.user_id = ut.user_id



//let query = [ ]
   //"SELECT c.cars_id, c.name, c.content, c.price, c.kilometre, f.name AS  carburant, cat.name AS category,fab.name AS fabricant, ut.username AS utilisateur FROM cars AS c JOIN fuels AS f ON c.cars_id = f.fuel_id JOIN categories AS cat ON c.cars_id = cat.category_id JOIN manufacturers AS fab ON c.cars_id = fab.id JOIN users AS ut ON c.cars_id = ut.user_id",
   //"SELECT c.car_id, c.name, c.content, c.price, c.kilometre, c.couleur, c.image, f.name AS carburant, cat.name AS catégorie, fab.name AS fabricant, ut.username AS utilisateur FROM cars AS c JOIN fuels AS f ON c.fuel_id = f.fuel_id JOIN categories AS cat ON cat.category_id = cat.category_id JOIN manufacturers AS fab ON fab.manufacturer_id = fab.manufacturer_id JOIN users AS ut ON ut.user_id = ut.user_id",


  // console.log("result :", result)

    //  console.log("result[2]: ", result[2]);

    // let query = "SELECT * FROM players INNER JOIN club ON club_id = club.id;"


    //limiter les utilisateur
    SELECT c.car_id, c.name, c.content, c.price, c.kilometre, c.couleur, c.image, f.name AS carburant, cat.name AS catégorie, fab.name AS fabricant, ut.username AS utilisateur, c.created_at FROM cars AS c
  JOIN fuels AS f ON c.fuel_id = f.fuel_id
  JOIN categories AS cat ON cat.category_id = cat.category_id
  JOIN manufacturers AS fab ON fab.manufacturer_id = fab.manufacturer_id 
  JOIN users AS ut ON ut.user_id = ut.user_id
  ORDER BY created_at ASC
  LIMIT 10

  // pour selectionner les carburant, categories 
  <% fuelsList.forEach(function(fuel) {%>
    <option value="<%=fuel.fuel_id%>" ><%=fuel.name%></option>
  <%});%>



create table messages
  messages_id int primary key auto_increment not null 
  title 
  content
  car_id
  user_id

  //add a cars to the admin dasboard

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


//afficher carburant actuelle

SELECT 
    c.*,
    f.name AS carburant
FROM
    cars AS c
join fuels AS f on c.fuel_id = f.fuel_id
WHERE
    car_id = 50


    SELECT 
    c.*,
    cat.name AS categorie
FROM
    cars AS c
join categories AS cat on c.category_id = cat.category_id
WHERE
    car_id = 50

    SELECT 
    c.*,
    fab.name AS fabricant
FROM
    cars AS c
join manufacturers AS fab on c.manufacturer_id = fab.manufacturer_id
WHERE
    car_id = 50

declancher


    https://sql.sh/cours/create-trigger

Philippe
CREATE TABLE Customer ( id INTEGER PRIMARY KEY AUTO_INCREMENT, name TEXT, last_order_id INT ); CREATE TABLE Sale ( id INTEGER PRIMARY KEY, item_id INT, customer_id INT, price INT );


CREATE TABLE Clients ( id INTEGER PRIMARY KEY AUTO_INCREMENT, nom TEXT, derniere_commande_id INT ); CREATE TABLE Ventes ( id INTEGER PRIMARY KEY AUTO_INCREMENT, ref INT, client_id INT, prix INT );
INSERT INTO Clients (nom) VALUES ('François'), ('Julien'), ('Sarah')

   /*
    npm install async
  
    async.parallel({
   one: function(callback) {
      callback(null, 'abc\n');
   },
   two: function(callback) {
     callback(null, 'xyz\n');
   }
  }, function(err, results) {
    if (error) throw error;
      res.render('test', {
        columnNames: results.one, 
        dataRegistros: results.two      
     });
  });

  
    */