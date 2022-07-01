const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

//-------------------------------------
//Listings Functions

//All listings
const getAllListings = function() {
  const sql = `
  SELECT listings.*, users.username AS username FROM users
  JOIN listings
  ON users.id = listings.breeder_id
  ORDER BY price;`;
  return pool
    .query(sql)
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
exports.getAllListings = getAllListings;

//gets the breeder username of the pet from pet_id
const breederOfPet = function(pet_id) {
  const sql = `
  SELECT users.username FROM users
  JOIN listings
  ON users.id = listings.breeder_id
  WHERE listings.id = $1;`;
  return pool
    .query(sql, [user_id])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
exports.breederOfPet = breederOfPet;

//All of a breeder's active listings
const userListings = function(breeder_id) {
  const sql = `
  SELECT users.username, listings.* FROM listings
  JOIN users
  ON users.id = listings.breeder_id
  WHERE breeder_id = $1 AND is_sold = false
  ORDER BY listings.name DESC;`;
  return pool
    .query(sql, [breeder_id])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
exports.userListings = userListings;

//All of a breeders sold listings
const userSoldListings = function(breeder_id) {
  const sql = `
  SELECT listings.* FROM listings
  WHERE breeder_id = $1 AND is_sold = true
  ORDER BY date_sold DESC;`;
  return pool
    .query(sql, [breeder_id])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
exports.userSoldListings = userSoldListings;

//Users saved/favorited animals
const usersFavourites = function(user_id) {
  const sql = `
  SELECT listings.*, users.username FROM listings
  JOIN users
  ON users.id = listings.breeder_id
  JOIN favourites
  ON listings.id = favorites.listings_id
  WHERE favorites.users_id = $1;`;
  return pool
    .query(sql, [user_id])
    .then((result) => {
      console.log("This is the result.rows: ",result.rows);
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
exports.usersFavourites = usersFavourites;

//--------------------------------------------------------
//Editing Queries

//add listing to user favourites list
const addToFavourites = function(user_id, listings_id) {
  const sql = `
  INSERT INTO favorites (users_id, listings_id)
  VALUES ($1, $2)
  RETURNING *;`;
  return pool
    .query(sql, [user_id, listings_id])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
exports.addToFavourites = addToFavourites;

//remove listing from user favourites list
const removeFromFavourites = function(user_id, listing_id) {
  const sql = `
  DELETE FROM favorites
  WHERE users_id = $1 AND listings_id = $2
  RETURNING *;`;
  return pool
    .query(sql, [user_id, listing_id])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
exports.removeFromFavourites = removeFromFavourites;

//take down users active listing
const removeListing = function(user_id, listing_id) {
  const sql = `
  DELETE FROM listings
  WHERE breeder_id = $1 AND id = $2
  RETURNING *`;
  return pool
    .query(sql, [user_id, listing_id])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
exports.removeListing = removeListing;

//get listing by id
const listingById = function(pet_id) {
  const sql = `
  SELECT listings.*, users.username FROM listings
  JOIN users
  ON users.id = listings.breeder_id
  WHERE listings.id = $1`;
  return pool
    .query(sql, [pet_id])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
exports.listingById = listingById;

/*
--TEMPLATE--
const 1 = function(user_id) {
  const sql = ``;
  return pool
  .query (sql, user_id)
  .then ((result) => {
    return result.rows;
  })
  .catch ((error) => {
    console.log(error.message);
  })
};
exports
*/
