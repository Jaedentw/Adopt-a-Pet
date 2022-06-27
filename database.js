const { Pool } = require('pg');


// QUERIES FOR USERS
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------

// Creates the database pool
const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'midterm'
});




//Search Query for getting all users
const getAllUsers = () => {
  const search = `SELECT * FROM users;`;
  return pool
  .query(search)
  .then((result) => {
    // console.log(result.rows)
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};


exports.getAllUsers = getAllUsers;


// Search Query for user with specific email
const getUserWithEmail = (email) => {
  const search = `SELECT name, email
  FROM users
  WHERE email = $1;`;
  return pool
    .query(search, [email])
    .then((result) => {
      // console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;


// Search Query for user with specific ID;
const getUserWihId = (id) => {
  const search = `SELECT name, id
  FROM users
  WHERE id = $1;`;
  return pool
    .query(search, [id])
    .then((result) => {
      // console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Adds a user to the database;
const addUser =  function(user) {
  const search = `
  INSERT INTO users
  (name, last_name, username, email, password, phone_number, country, city)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *
  `;
  return pool
  .query(search,
  [user.name, user.lastname, user.username, user.email, user.password, user.phone_number, user.country, user.city])
  .then((result) => {
   return result.rows[0];
  })
  .catch((err) => {
   console.log(err.message);
  });
 }
 exports.addUser = addUser;
 exports.getUserWihId = getUserWihId;


 // QUERIES LISTINGS/Favourites
 //----------------------------------------------------------------------------------------------------------------
 //----------------------------------------------------------------------------------------------------------------
 //----------------------------------------------------------------------------------------------------------------
 //---------------------------------------------------------------------------------------------------------------



