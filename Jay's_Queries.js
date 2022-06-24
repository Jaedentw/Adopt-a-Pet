const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'midterm'
});

//user profile information
const getUserProfile = function(user_id) {
  const sql = `
  SELECT name, last_name, username, email, country, city, bio FROM users
  WHERE id = $1;`;
  return pool
  .query (sql, user_id)
  .then ((result) => {
    return result.rows;
  })
  .catch ((error) => {
    console.log(error.message);
  })
};

exports.getUserProfile = getUserProfile;

//All of a breeder's active listings
const userListings = function(breeder_id) {
  const sql = `
  SELECT users.username, listings.* FROM listings
  JOIN users
  ON users.id = listings.breeder_id
  WHERE breeder_id = $1 AND is_sold = false
  ORDER BY date_sold DESC;`;
  return pool
  .query (sql, breeder_id)
  .then ((result) => {
    return result.rows;
  })
  .catch ((error) => {
    console.log(error.message);
  })
};

exports.userListings = userListings;

//All of a breeders sold listings
const soldListings = function(breeder_id) {
  const sql = `
  SELECT * FROM listings
  WHERE breeder_id = $1 AND is_sold = true
  ORDER BY date_sold DESC;`;
  return pool
  .query (sql, breeder_id)
  .then ((result) => {
    return result.rows;
  })
  .catch ((error) => {
    console.log(error.message);
  })
};

exports.soldListings = soldListings;

//featured page of listings, same country and city
//breeder_id IS NOT user_id --> to make sure we're not featuring the animals this user may be selling
const featuredForUser = function(user_id, country, city) {
  const sql = `
  SELECT * FROM listings
  WHERE breeder_id IS NOT $1
  AND country = $2
  AND city = $3;`;
  return pool
  .query (sql, [user_id, country, city])
  .then ((result) => {
    return result.rows;
  })
  .catch ((error) => {
    console.log(error.message);
  })
};

exports.featuredForUser = featuredForUser;

//Users saved/favorited animals
const usersFavourites = function(user_id) {
  const sql = `
  SELECT * FROM listings
  JOIN favourites
  ON listings.id = favorites.listings_id
  WHERE favorites.users_id = $1;`;
  return pool
  .query (sql, user_id)
  .then ((result) => {
    return result.rows;
  })
  .catch ((error) => {
    console.log(error.message);
  })
};

exports.usersFavourites = usersFavourites;

//shows user favourites
const soldFavourites = function(user_id) {
  const sql = `
  SELECT * FROM listings
  JOIN favourites
  ON listings.id = favorites.listings_id
  WHERE favorites.users_id = $1 AND is_sold = true;`;
  return pool
  .query (sql, user_id)
  .then ((result) => {
    return result.rows;
  })
  .catch ((error) => {
    console.log(error.message);
  })
};

exports.soldFavourites = soldFavourites;

//utility queries

//add listing to user favourites list
const addToFavourites = function(user_id, listings_id) {
  const sql = `
  INSERT INTO favorites (users_id, listings_id)
  VALUES ($1, $2)
  RETURNING *;`;
  return pool
  .query (sql, [user_id, listings_id])
  .then ((result) => {
    return result.rows;
  })
  .catch ((error) => {
    console.log(error.message);
  })
};

exports.addToFavourites = addToFavourites;

//remove listing from user favourites list
const removeFromFavourites = function(user_id, listing_id) {
  const sql = `
  DELETE FROM favorites
  WHERE users_id = $1 AND listings_id = $2
  RETURNING *;`;
  return pool
  .query (sql, [user_id, listing_id])
  .then ((result) => {
    return result.rows;
  })
  .catch ((error) => {
    console.log(error.message);
  })
};

exports.removeFromFavourites = removeFromFavourites;

//take down users active listing
const removeListing = function(user_id, listing_id) {
  const sql = `
  DELETE FROM listings
  WHERE breeder_id = $1 AND id = $2
  RETURNING *`;
  return pool
  .query (sql, [user_id, listing_id])
  .then ((result) => {
    return result.rows;
  })
  .catch ((error) => {
    console.log(error.message);
  })
};

exports.removeListing = removeListing;

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
