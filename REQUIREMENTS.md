######## Used Technologies ########

- Postgres for database 
- Node/Express for appliction logic 
- dotenv from npm for manging environment varibales
- db-migrate from npm for migrations 
- jsonwebtoken from npm for working with JWTs
- jsamine from npm for testing 




######## API Requirements ########
# The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

# These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 





######## API Endpoints ########

#### Products ####
- Index

#### Create [token required] ####
- Route: /api/products/ 
- Method: POST
- Data params: 
{
  "name": "",
  "price": "",
  "category": ""
}




#### Show all [token required] ####
- Route: /api/products/ 
- Method: GET

#### Show one (args: product id) [token required] ####
- Route: /api/products/:id 
- Method: GET
- URL Params: id

#### Products by category (args: product category) [token required] #### 
- Route: /api/products/category/:category
- URL Params: category
- Method: POST

#### Update (args: product id) [token required] ####
- Route: /api/products/:id
- Method: PATCH
- URL Params: id
- Data params:
{
  "name": " ",
  "price": ,
  "category": " ",
  "id": " "
}

#### Delete (args: product id) [token required] ####
- Route: /api/products/:id
- Method: DELETE
- URL Params: id



#### Users #### 
- Index [token required]

#### Create [token required] ####
- Route: /api/users/ 
- Method: POST
- Data params:
{
  "username": " ",
  "first_name": " ",
  "last_name": " ",
  "password": " "
}
#### Show all [token required] ####
- Route: /api/users/ 
- Method: GET

#### Show one (args: user id) [token required] ####
- Route: /api/users/:id 
- Method: GET
- URL Params: id

#### Update (args: user id) [token required] #### 
- Route: /api/users/:id
- Method: PATCH
- URL Params: id
- Data params:
{
  "username": " ",
  "first_name": " ",
  "last_name": " "
}

#### Delete (args: user id) [token required]  ####
- Route: /api/users/:id
- Method: DELETE
- URL Params: id

#### Auth ####
- Route: /api/users/auth
- Method: POST
- Data params:
{
  "username":" ",
  "password":" "
}



#### Orders ####

- Index [token required]

#### Create [token required] ####
- Route: /api/orders/ 
- Method: POST
- Data params:
{
  "user_id":" ",
  "status":" "
}

#### Show one (args: order id) [token required] ####
- Route: /api/orders/:id 
- Method: GET
- URL Params: id

#### Add product (arg: user_id) [token required] ####
- Route: /api/orders/:user_id/products 
- Method: POST
- URL Params: id

{
  "product_id":" ",
  "quantity":" ",
  "order_id":" ",
  "user_id": " "
} 

#### Show one (args: order_id) [token required] ####
- Route: /api/orders/:id 
- Method: GET
- URL Params: id

#### Delete (args: order id) [token required] ####
- Route: /api/users/:id
- Method: DELETE
- URL Params: id



######## Database ########
- Create store_main database for main project

- Create second database store_test for testing

######## Tables ########


# users #

## columns ##
- id - type: SERIAL PRIMARY KEY 

- username VARCHAR UNIQUE NOT NULL

- first_name VARCHAR(50) NOT NULL

- last_name VARCHAR(50) NOT NULL

- password VARCHAR(255) NOT NULL


### products ####

## columns ##
- id SERIAL PRIMARY KEY

- name VARCHAR(64) NOT NULL

- price VARCHAR(50) NOT NULL

- category VARCHAR(64) NOT NULL


#### orders ####

## columns ##
- id SERIAL PRIMARY KEY

- status VARCHAR(15)

- user_id bigint REFERENCES users(id)

#### order_product ####

## columns ##
- id SERIAL PRIMARY KEY

- quantity integer

- order_id bigint REFERENCES orders(id)

- product_id bigint REFERENCES products(id)


######## Data Shapes ########

#### Product ####
-  id
- name
- price
- [OPTIONAL] category

#### User ####
- id
- username
- firstName
- lastName
- password

#### Orders ####
- id
- user_id
- status of order (active or complete)

#### Order Product
- id
- id of each product in the order
- quantity of each product in the order
- user_id