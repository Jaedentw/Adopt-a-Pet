CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  users_id INTEGER references users(id) ON DELETE CASCADE,
  listings_id INTEGER references listings(id) ON DELETE CASCADE
);
