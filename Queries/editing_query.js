const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'midterm'
});

const edit = function(user_id, pet_id, options) {
  let userId = 16; // MAKE SURE USERID IS AT 'DEFAULT' user user's ID;
  if (user_id != null){
    userId = user_id;
  }

  let queryParams = [userId, pet_id];
  let queryText = `UPDATE listings SET`

  if (options.name) {

    queryParams.push(`${options.name}`);

    queryText += `, name = $${queryParams.length}`;
  }

  if (options.type) {

    queryParams.push(`${options.type}`);

    queryText += `, type = $${queryParams.length}`;
  }

  if (options.breed) {

    queryParams.push(`${options.breed}`);

    queryText += `, breed = $${queryParams.length}`;
  }

  if (options.gender) {
    queryParams.push(`${options.gender}`);
    queryText += `, gender = $${queryParams.length}`;
  }

  if (options.colour) {

    queryParams.push(`${options.colour}`);


    queryText += `, colour = $${queryParams.length}`;
  }

  if (options.birthday) {
    queryParams.push(`${options.birthday}`);
    queryText += `, birthday = $${queryParams.length}`;
  }

  if (options.price) {
    queryParams.push(`${options.price}`);
    queryText += `, price = $${queryParams.length}`;
  }

  if (options.is_sold) {
    queryParams.push(`${options.is_sold}`);
    queryText += `, is_sold = $${queryParams.length}`;
  }

  if (options.date_sold) {
    queryParams.push(`${options.date_sold}`);
    queryText += `, date_sold = $${queryParams.length}`;
  }

  if (options.ready_date) {
    queryParams.push(`${options.ready_date}`);
    queryText += `, ready_date = $${queryParams.length}`;
  }

  if (options.thumbnail_photo_url) {
    queryParams.push(`${options.thumbnail_photo_url}`);
    queryText += `, thumbnail_photo_url = $${queryParams.length}`;
  }

  if (options.description) {
    queryParams.push(`${options.description}`);
    queryText += `, description = $${queryParams.length}`;
  }


  queryText = queryText.slice(0, 19) + queryText.slice(20);
  queryText += ` WHERE breeder_id = $1 AND listings.id = $2;`;


  return pool
  .query (queryText, queryParams)
  .then ((result) => {

    return result.rows;
  })
  .catch ((error) => {
    console.log(error.message);
  })
};

exports.edit = edit;
