INSERT INTO products ( ProductName, price, imgURL, size) 
VALUES ('Cascadia Hoodie', 50, 'https://cdn.shopify.com/s/files/1/1612/2077/products/Hoodie_Mockup_14150ab7-67e3-428e-9a5e-4f8f44af5793_2048x2048.jpg?v=1480226880', 'Large');
INSERT INTO products ( ProductName, price, imgURL) 
VALUES ('Cascadia Mug', 15, 'https://cdn.shopify.com/s/files/1/1612/2077/products/mockup-f2c88150_2048x2048.jpg?v=1480204773');
INSERT INTO products ( ProductName, price, imgURL, size) 
VALUES ('Cascadia Tee', 25, 'https://cdn.shopify.com/s/files/1/1612/2077/products/Tee_Mockup_2_9050ac4e-3578-448f-8144-e1e99b3ef86d_2048x2048.jpg?v=1480896802', 'Large');
INSERT INTO products ( ProductName, price, imgURL, size) 
VALUES ('Evergreen Tee', 25, 'https://cdn.shopify.com/s/files/1/1612/2077/products/Tee_Mockup_2_3b108dec-c9c9-42fe-9d00-45645eeb2c5f_2048x2048.jpg?v=1480901935', 'Large');
INSERT INTO products ( ProductName, price, imgURL, size) 
VALUES ('Hawk Grey Hoodie', 50, 'https://cdn.shopify.com/s/files/1/1612/2077/products/Hoodie_Mockup_Small_Grey_2048x2048.jpg?v=1480226245', 'Large');


-- CREATE TABLE products (
--   productID SERIAL PRIMARY KEY NOT NULL,
--   productName text,
--   price integer,
--   imgURL text,
--   size text
-- );

-- create table cart (
--     entryid serial primary key,
--     userid integer,
--     productid integer,
--     productprice integer,
--     quantity integer,
--     imgURL text
-- );

-- 1. user visits site, I store a cookie or 
-- Window.localstorage to track each userID

-- 2. user clicks “add to cart” on one of the products, I add a row to ‘cart’ table with user id, 
-- product id, price, quantity

-- 3. Then the cart component accesses the table from database, 
-- select * from cart where userID matches current userID

 
-- step 1 do it through postman -> get the table and api working for a fake user (id = 1)

-- Step 2 - get a cart page working

-- Step 3 - set up local storage and plug userid=1 in manually

-- Step 4 - set up add to cart, create user if not exists and stuff... 
-- just break it down and you'll have it done tonight