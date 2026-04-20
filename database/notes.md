
postgres(> CREATE TABLE users (
postgres(>   id SERIAL PRIMARY KEY,
postgres(>   name TEXT NOT NULL,
postgres(>   email TEXT UNIQUE
postgres(> );
postgres(> INSERT INTO users (name, email)
postgres(> VALUES 
postgres(> ('Saksham', 'saksham@gmail.com'),
postgres(> ('Rahul', 'rahul@gmail.com'),
postgres(> ('Aman', 'aman@gmail.com');
postgres(> SELECT * FROM users;
postgres(> SELECT * FROM users WHERE name = 'Saksham';
postgres(> UPDATE users
postgres(> SET name = 'Saksham Arora'
postgres(> WHERE id = 1;
postgres(> ^C
postgres=> CREATE TABLE users (
postgres(>   id SERIAL PRIMARY KEY,
postgres(>   name TEXT NOT NULL,
postgres(>   email TEXT UNIQUE
postgres(> );
CREATE TABLE
postgres=> INSERT INTO users (name, email)
postgres-> VALUES 
postgres-> ('Saksham', 'saksham@gmail.com'),
postgres-> ('Rahul', 'rahul@gmail.com'),
postgres-> ('Aman', 'aman@gmail.com');
INSERT 0 3
postgres=> SELECT * FROM users;
 id |  name   |       email       
----+---------+-------------------
  1 | Saksham | saksham@gmail.com
  2 | Rahul   | rahul@gmail.com
  3 | Aman    | aman@gmail.com
(3 rows)





postgres=> 
postgres=> CREATE TABLE customers (
postgres(>   id SERIAL PRIMARY KEY,
postgres(>   name TEXT NOT NULL,
postgres(>   email TEXT UNIQUE,
postgres(>   city TEXT DEFAULT 'Delhi'
postgres(> );
CREATE TABLE
postgres=> CREATE TABLE orders (
postgres(>   id SERIAL PRIMARY KEY,
postgres(>   product_name TEXT,
postgres(>   price INTEGER CHECK (price > 0),
postgres(>   customer_id INTEGER REFERENCES customers(id)
postgres(> );
CREATE TABLE
postgres=> INSERT INTO customers (name, email)
postgres-> VALUES 
postgres-> ('Saksham', 'saksham@gmail.com'),
postgres-> ('Rahul', 'rahul@gmail.com');
INSERT 0 2
postgres=> INSERT INTO orders (product_name, price, customer_id)
postgres-> VALUES 
postgres-> ('iPhone', 80000, 1),
postgres-> ('Shoes', 3000, 1),
postgres-> ('Watch', 5000, 2);
INSERT 0 3
postgres=> SELECT customers.name, orders.product_name, orders.price
postgres-> FROM customers
postgres-> JOIN orders ON customers.id = orders.customer_id;
  name   | product_name | price 
---------+--------------+-------
 Saksham | iPhone       | 80000
 Saksham | Shoes        |  3000
 Rahul   | Watch        |  5000
(3 rows)


saksham=> CREATE TABLE users (
saksham(>  id SERIAL PRIMARY KEY,
saksham(>  name TEXT NOT NULL,
saksham(>  email TEXT UNIQUE
saksham(> );
CREATE TABLE
saksham=> INSERT INTO users (name, email)
saksham-> VALUES
saksham-> ('Saksham', 'saksham@gmail.com'),
saksham-> ('Rahul ', 'rahul@g,ail.com'),
saksham-> ('Aman', 'aman@gmail.com');
INSERT 0 3
saksham=> SELECT *FROM users;
 id |  name   |       email       
----+---------+-------------------
  1 | Saksham | saksham@gmail.com
  2 | Rahul   | rahul@g,ail.com
  3 | Aman    | aman@gmail.com
(3 rows)



where query


saksham_db=# SELECT * FROM users;
 id |  name   | age |    city    
----+---------+-----+------------
  1 | Saksham |  21 | Delhi
  2 | Rahul   |  25 | Mumbai
  3 | Amit    |  19 | Delhi
  4 | Simran  |  23 | Chandigarh
  5 | Ankit   |  18 | Delhi
(5 rows)

saksham_db=# SELECT * FROM users
saksham_db-# WHERE city = 'Delhi';
 id |  name   | age | city  
----+---------+-----+-------
  1 | Saksham |  21 | Delhi
  3 | Amit    |  19 | Delhi
  5 | Ankit   |  18 | Delhi
(3 rows)



saksham_db=# SELECT * FROM users
saksham_db-# WHERE age > 20;
 id |  name   | age |    city    
----+---------+-----+------------
  1 | Saksham |  21 | Delhi
  2 | Rahul   |  25 | Mumbai
  4 | Simran  |  23 | Chandigarh
(3 rows)

saksham_db=# 




