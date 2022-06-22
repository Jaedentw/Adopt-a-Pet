-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS users CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);


