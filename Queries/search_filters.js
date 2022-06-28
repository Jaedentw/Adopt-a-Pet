const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'midterm'
});

const search = function(user_id, country, options) {
  const queryParams = [user_id, country];
  const queryText = `
  SELECT listings.*, users.username FROM listings
  JOIN users
  ON users.id = listings.owner_id
  WHERE breeder_id IS NOT $1
  AND country = $2
  AND is_sold IS NOT true `;

  if (options.type) {
    queryParams.push(`%${options.type}%`);
    queryText += `AND type LIKE $${params.length} `;
  }

  if (options.breed) {
    queryParams.push(`%${options.breed}%`);
    queryText += `AND breed LIKE $${params.length} `;
  }

  if (options.gender) {
    queryParams.push(`%${options.gender}%`);
    queryText += `AND gender LIKE $${params.gender} `;
  }

  if (options.price) {
    queryParams.push(`%${options.price}%`);
    queryText += `AND price LIKE $${params.price} `;
  }

  if (options.ready_date) {
    queryParams.push(`%${options.ready_date}%`);
    queryText += `AND ready_date LIKE $${params.ready_date} `;
  }

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryText += `AND city LIKE $${params.city} `;
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
