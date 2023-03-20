# Setup and connect to the database #
- install postgres

- install npm: npm install

- install node-postgress: npm install pg

- install dotenv: npm install dotenv to manage environment varibales

- set environment varibales:
{
PORT= express port
NODE_ENV=dev
#Database connection

PGHOST= localhost
PGPORT= database port
PGDATABASE= database_name
PGDATABASETEST= test_database_name
PGUSER= postgres
PGPASSWORD= postgres_passowrd
#User
BCRYPTPASS= 
SALTROUNDS=
TOKENSECRET= 

}

- connect to default postgres database: `psql -U postgres`

- create psql user: run in psql => `CREATE USER store_user PASSWORD '1234';`

- create store_main database: run in psql => `CREATE DATABASE store_main;`

- create store_test database for unit testing: run in psql => `CREATE DATABASE store_test;`

- connect to databasees and grant all privileges

  - for dev database: 

    - connect: `\c store_mian`
    - give privileges: `GRANT ALL PRIVILEGES ON DATABASE store_main to store_user;`

  - for test database:
  
    - connect: `\c store_test`
    - give privileges: `GRANT ALL PRIVILEGES ON DATABASE store_test to store_user;`

- install db-migrate: npm install db-migrate

- create tables: npx db-migrate create tableName-table --sql-file

- set migrations up and down for every table

- run migrations up: npx db-migrate up

- start server: npm run start

# Ports #
- Express port: 3000
- database port: 5432

# Unit testing #
- Run test: npm run test



