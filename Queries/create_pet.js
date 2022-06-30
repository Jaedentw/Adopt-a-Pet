const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const createNewPet = function(user_id, options) {
  let userId = 16; // MAKE SURE USERID IS AT 'DEFAULT' user user's ID;
  if (user_id != null){
    userId = user_id;
  }

  let queryParams = [userId, options.name, options.type, options.breed, options.gender, options.colour, options.birthday, options.price, options.ready_date, options.thumbnail_photo_url, options.description];
  let queryText1 = `INSERT INTO listings (breeder_id, name, type, breed, gender, colour, birthday, price, ready_date, thumbnail_photo_url, description`;
  let queryText2 = `VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11`

  if (options.is_sold) {
    queryParams.push(options.is_sold);
    queryText1 += `, is_sold`
    queryText2 += `, $${queryParams.length}`
  }

  if (options.date_sold) {
    queryParams.push(options.date_sold);
    queryText1 += `, date_sold`
    queryText2 += `, $${queryParams.length}`
  }

  queryText1 += `) `
  queryText2 += `);`
  finalText = queryText1 + queryText2;
  console.log('This is the query: ',finalText)
  return pool
  .query (finalText, queryParams)
  .then ((result) => {

    return result.rows;
  })
  .catch ((error) => {
    console.log(error.message);
  })
}

exports.createNewPet = createNewPet;
