CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  breed VARCHAR(255) NOT NULL,
  gender VARCHAR(255) NOT NULL,
  colour VARCHAR(255) NOT NULL,
  birthday DATE NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  is_sold BOOLEAN NOT NULL DEFAULT FALSE,
  date_sold DATE,
  buyer_id INTEGER references users(id) ON DELETE CASCADE,
  ready_date DATE NOT NULL,
  description VARCHAR(255) NOT NULL,
  breeder_id INTEGER references users(id) ON DELETE CASCADE
);
