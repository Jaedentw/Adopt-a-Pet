const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});



const getUserWithEmail = (email) => {
  return pool
    .query(`SELECT name, email
            FROM users
            WHERE email = $1;`, [email])
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;

const getUserWihId = (id) => {
  return pool
    .query(`SELECT name, id
            FROM users
            WHERE id = $1;`, [id])
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWihId = getUserWihId;
