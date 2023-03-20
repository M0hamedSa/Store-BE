CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price VARCHAR(50) NOT NULL,
    category VARCHAR(64) NOT NULL
);