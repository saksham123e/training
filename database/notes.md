
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
