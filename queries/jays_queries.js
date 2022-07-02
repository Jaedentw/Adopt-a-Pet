const { Pool } = require('pg');
const { user } = require('pg/lib/defaults');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

//All of a breeder's active listings
const userListings = function(user_id) {
  const sql = `
  SELECT users.username, listings.* FROM listings
  JOIN users
  ON users.id = listings.breeder_id
  WHERE breeder_id = $1`

  return pool
    .query(sql, [user_id])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
exports.userListings = userListings;


//sold unsold user listings
const is_sold_listings = function(breeder_id, tf) {
  let sql =
  `SELECT users.username, listings.* FROM listings
  JOIN users
  ON users.id = listings.breeder_id
  WHERE breeder_id = $1
  AND is_sold = $2;`;
  return pool
  .query(sql, [breeder_id,tf])
  .then((result) => {
    return result.rows;
  })
  .catch((error) => {
    console.log(error.message);
  });
}
exports.is_sold_listings = is_sold_listings;

//featured page of listings, same country and city
//breeder_id IS NOT user_id --> to make sure we're not featuring the animals this user may be selling
const featuredForUser = function(user_id) {
  const sql = `
  SELECT listings.*, users.username FROM listings
  JOIN users
  ON users.id = listings.breeder_id
  WHERE breeder_id IS NOT $1
  AND is_sold IS NOT true`;
  return pool
    .query(sql, [user_id])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

exports.featuredForUser = featuredForUser;

//Users saved/favorited animals
const usersFavourites = function(user_id) {
  const sql = `
  SELECT listings.*, users.username FROM listings
  JOIN users
  ON users.id = listings.breeder_id
  JOIN favourites
  ON listings.id = favorites.listings_id
  WHERE favorites.users_id = $1
  AND is_sold IS NOT true;`;
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

//utility queries

//add listing to user favourites list
const addToFavourites = function(user_id, listings_id) {
  const sql = `
  INSERT INTO favourites (users_id, listings_id)
  VALUES ($1, $2)
  RETURNING *;`;
  return pool
    .query(sql, [user_id, listings_id])
    .then((result) => {
      console.log('This is row:',result.rows);
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
const removeListing = function(listing_id) {
  const sql = `
  DELETE FROM listings
  WHERE id = $1
  RETURNING *`;
  return pool
    .query(sql, [listing_id])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

exports.removeListing = removeListing;

//all listings
const getAllListings = function() {
  const sql = `SELECT * FROM listings;`;
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
