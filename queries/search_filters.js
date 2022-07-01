const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const search = function(user_id, options) {
  let userId = 16; // MAKE SURE USERID IS AT 'DEFAULT' user user's ID;
  if (user_id !== null) {
    userId = user_id;
  }


  let queryParams = [userId];
  let queryText = `
  SELECT listings.*, users.username FROM listings
  JOIN users
  ON users.id = listings.breeder_id`

  if (options.favourites === 'on') {
    queryText += ` JOIN favourites
    ON listings.id = favourites.listings_id
    WHERE favourites.users_id = $1`
  }

  queryText += ` AND breeder_id != $1
  AND is_sold IS NOT true `;

  console.log(queryText);

  if (options.type) {
    queryParams.push(`%${options.type}%`);
    queryText += `AND type LIKE lower($${queryParams.length}) `;
  }

  if (options.breed) {
    queryParams.push(`%${options.breed}%`);
    queryText += `AND breed LIKE lower($${queryParams.length}) `;
  }

  if (options.gender) {
    queryParams.push(`${options.gender}`);
    queryText += `AND gender LIKE lower($${queryParams.length}) `;
  }

  if (options.maxPrice) {
    queryParams.push(`${options.maxPrice}`);
    queryText += `AND price <= $${queryParams.length} `;
  }

  if (options.minPrice) {
    queryParams.push(`${options.minPrice}`);
    queryText += `AND price >= $${queryParams.length} `;
  }

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryText += `AND city LIKE lower($${queryParams.length}) `;
  }

  if (options.country) {
    queryParams.push(`%${options.country}%`);
    queryText += `AND country LIKE lower($${queryParams.length}) `;
  }

  queryText += `ORDER BY price;`;

  return pool
    .query(queryText, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

exports.search = search;



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

/*
  JOIN favourites
  ON listings.id = favorites.listings_id
  WHERE favorites.users_id = $1
*/
