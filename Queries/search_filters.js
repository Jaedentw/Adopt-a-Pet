const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'midterm'
});

const search = function(options, user_id) {
  const queryParams = [user_id];
  const queryText = `
  SELECT listings.*, users.username FROM listings
  JOIN users
  ON users.id = listings.owner_id
  WHERE breeder_id IS NOT $1
  AND is_sold IS NOT true `;

  if (options.type) {
    queryParams.push(`%${options.type}%`);
    queryText += `AND type LIKE $${queryParams.length} `;
  }

  if (options.breed) {
    queryParams.push(`%${options.breed}%`);
    queryText += `AND breed LIKE $${queryParams.length} `;
  }

  if (options.gender) {
    queryParams.push(`%${options.gender}%`);
    queryText += `AND gender LIKE $${queryParams.length} `;
  }

  if (options.price) {
    queryParams.push(`%${options.price}%`);
    queryText += `AND price LIKE $${queryParams.length} `;
  }

  if (options.ready_date) {
    queryParams.push(`%${options.ready_date}%`);
    queryText += `AND ready_date LIKE $${queryParams.length} `;
  }

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryText += `AND city LIKE $${queryParams.length} `;
  }

  if (options.country) {
    queryParams.push(`%${options.country}%`);
    queryText += `AND country LIKE $${queryParams.length} `;
  }

  return pool
  .query (queryText, queryParams)
  .then ((result) => {
    return result.rows;
  })
  .catch ((error) => {
    console.log(error.message);
  })
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
