saksham@saksham-HP-Pavilion-Gaming-Laptop-15-dk0xxx:~$ sudo -u postgres psql
[sudo] password for saksham: 
psql (12.22 (Ubuntu 12.22-0ubuntu0.20.04.4))
Type "help" for help.

postgres=# CREATE DATABASE airline_db;
CREATE DATABASE
postgres=# \c airline_db
You are now connected to database "airline_db" as user "postgres".
airline_db=# CREATE TABLE Flights (
airline_db(#   flno INT PRIMARY KEY,
airline_db(#   source TEXT,
airline_db(#   destination TEXT,
airline_db(#   distance INT,
airline_db(#   departs TIME,
airline_db(#   arrives TIME,
airline_db(#   price INT
airline_db(# );
CREATE TABLE
airline_db=# CREATE TABLE Aircraft (
airline_db(#   aid INT PRIMARY KEY,
airline_db(#   aname TEXT,
airline_db(#   cruisingrange INT
airline_db(# );
CREATE TABLE
airline_db=# CREATE TABLE Employees (
airline_db(#   eid INT PRIMARY KEY,
airline_db(#   ename TEXT,
airline_db(#   salary INT
airline_db(# );
CREATE TABLE
airline_db=# CREATE TABLE Certified (
airline_db(#   eid INT,
airline_db(#   aid INT,
airline_db(#   FOREIGN KEY (eid) REFERENCES Employees(eid),
airline_db(#   FOREIGN KEY (aid) REFERENCES Aircraft(aid)
airline_db(# );
CREATE TABLE
airline_db=# 


airline_db=# INSERT INTO Aircraft VALUES
airline_db-# (101, 'Boeing 747', 5000),
airline_db-# (102, 'Airbus A320', 3000),
airline_db-# (103, 'Boeing 737', 3500),
airline_db-# (104, 'Cessna 172', 800),
airline_db-# (105, 'Boeing 777', 7000),
airline_db-# (106, 'Airbus A380', 8000),
airline_db-# (107, 'Boeing 787', 6500),
airline_db-# (108, 'Embraer E190', 2500),
airline_db-# (109, 'Bombardier CRJ', 2000),
airline_db-# (110, 'ATR 72', 1500),
airline_db-# (111, 'Gulfstream G650', 7500),
airline_db-# (112, 'Dassault Falcon', 6000),
airline_db-# (113, 'Boeing 767', 5500),
airline_db-# (114, 'Airbus A321', 3200),
airline_db-# (115, 'Antonov AN-225', 9000);
INSERT 0 15
airline_db=# INSERT INTO Employees VALUES
airline_db-# (1, 'Rahul', 90000),
airline_db-# (2, 'Saksham', 120000),
airline_db-# (3, 'Aman', 70000),
airline_db-# (4, 'Priya', 85000),
airline_db-# (5, 'Karan', 95000),
airline_db-# (6, 'Rohit', 110000),
airline_db-# (7, 'Simran', 75000),
airline_db-# (8, 'Neha', 130000),
airline_db-# (9, 'Arjun', 98000),
airline_db-# (10, 'Anjali', 87000),
airline_db-# (11, 'Vikas', 65000),
airline_db-# (12, 'Pooja', 72000),
airline_db-# (13, 'Manav', 150000),
airline_db-# (14, 'Isha', 92000),
airline_db-# (15, 'Dev', 88000),
airline_db-# (16, 'Tanya', 97000),
airline_db-# (17, 'Harsh', 101000),
airline_db-# (18, 'Nitin', 68000),
airline_db-# (19, 'Sneha', 79000),
airline_db-# (20, 'Yash', 140000);
INSERT 0 20
airline_db=# INSERT INTO Certified VALUES
airline_db-# (1, 101),
airline_db-# (1, 102),
airline_db-# (2, 101),
airline_db-# (2, 103),
airline_db-# (2, 105),
airline_db-# (3, 104),
airline_db-# (4, 102),
airline_db-# (4, 103),
airline_db-# (5, 105),
airline_db-# (6, 106),
airline_db-# (6, 107),
airline_db-# (7, 108),
airline_db-# (8, 101),
airline_db-# (8, 106),
airline_db-# (8, 115),
airline_db-# (9, 109),
airline_db-# (9, 110),
airline_db-# (10, 111),
airline_db-# (10, 112),
airline_db-# (11, 104),
airline_db-# (12, 108),
airline_db-# (13, 115),
airline_db-# (13, 107),
airline_db-# (13, 111),
airline_db-# (14, 103),
airline_db-# (14, 114),
airline_db-# (15, 110),
airline_db-# (16, 112),
airline_db-# (17, 113),
airline_db-# (17, 101),
airline_db-# (18, 104),
airline_db-# (19, 108),
airline_db-# (20, 115),
airline_db-# (20, 106),
airline_db-# (20, 107);
INSERT 0 35
airline_db=# INSERT INTO Flights VALUES
airline_db-# (1, 'Los Angeles', 'Chicago', 2800, '08:00', '12:00', 500),
airline_db-# (2, 'Los Angeles', 'Honolulu', 4500, '09:00', '15:00', 1000),
airline_db-# (3, 'Madison', 'New York', 900, '10:00', '14:00', 300),
airline_db-# (4, 'Chicago', 'New York', 800, '13:00', '16:00', 200),
airline_db-# (5, 'Madison', 'Chicago', 700, '09:00', '11:00', 150),
airline_db-# (6, 'Dallas', 'Miami', 1300, '06:00', '09:00', 350),
airline_db-# (7, 'Houston', 'Seattle', 2300, '07:00', '11:00', 450),
airline_db-# (8, 'Boston', 'Denver', 2000, '12:00', '16:00', 400),
airline_db-# (9, 'Atlanta', 'Las Vegas', 1800, '14:00', '18:00', 420),
airline_db-# (10, 'San Francisco', 'New York', 2900, '05:00', '11:00', 650),
airline_db-# (11, 'Chicago', 'Houston', 1100, '09:30', '12:00', 250),
airline_db-# (12, 'Miami', 'Boston', 1500, '15:00', '18:30', 370),
airline_db-# (13, 'Seattle', 'Los Angeles', 2100, '16:00', '19:00', 480),
airline_db-# (14, 'Denver', 'Atlanta', 1400, '08:30', '11:30', 320),
airline_db-# (15, 'Las Vegas', 'Dallas', 1200, '13:00', '15:30', 290),
airline_db-# (16, 'New York', 'London', 5600, '18:00', '06:00', 1500),
airline_db-# (17, 'London', 'Paris', 300, '09:00', '10:00', 180),
airline_db-# (18, 'Paris', 'Dubai', 3200, '11:00', '18:00', 700),
airline_db-# (19, 'Dubai', 'Delhi', 1400, '20:00', '23:00', 500),
airline_db-# (20, 'Delhi', 'Singapore', 2600, '07:00', '13:00', 800);
INSERT 0 20
airline_db=# SELECT * FROM Aircraft;
 aid |      aname      | cruisingrange 
-----+-----------------+---------------
 101 | Boeing 747      |          5000
 102 | Airbus A320     |          3000
 103 | Boeing 737      |          3500
 104 | Cessna 172      |           800
 105 | Boeing 777      |          7000
 106 | Airbus A380     |          8000
 107 | Boeing 787      |          6500
 108 | Embraer E190    |          2500
 109 | Bombardier CRJ  |          2000
 110 | ATR 72          |          1500
 111 | Gulfstream G650 |          7500
 112 | Dassault Falcon |          6000
 113 | Boeing 767      |          5500
 114 | Airbus A321     |          3200
 115 | Antonov AN-225  |          9000
(15 rows)

airline_db=# SELECT * FROM Employees;
 eid |  ename  | salary 
-----+---------+--------
   1 | Rahul   |  90000
   2 | Saksham | 120000
   3 | Aman    |  70000
   4 | Priya   |  85000
   5 | Karan   |  95000
   6 | Rohit   | 110000
   7 | Simran  |  75000
   8 | Neha    | 130000
   9 | Arjun   |  98000
  10 | Anjali  |  87000
  11 | Vikas   |  65000
  12 | Pooja   |  72000
  13 | Manav   | 150000
  14 | Isha    |  92000
  15 | Dev     |  88000
  16 | Tanya   |  97000
  17 | Harsh   | 101000
  18 | Nitin   |  68000
  19 | Sneha   |  79000
  20 | Yash    | 140000
(20 rows)

airline_db=# SELECT * FROM Certified;
airline_db=# SELECT * FROM Aircraft;
 aid |      aname      | cruisingrange 
-----+-----------------+---------------
 101 | Boeing 747      |          5000
 102 | Airbus A320     |          3000
 103 | Boeing 737      |          3500
 104 | Cessna 172      |           800
 105 | Boeing 777      |          7000
 106 | Airbus A380     |          8000
 107 | Boeing 787      |          6500
 108 | Embraer E190    |          2500
 109 | Bombardier CRJ  |          2000
 110 | ATR 72          |          1500
 111 | Gulfstream G650 |          7500
 112 | Dassault Falcon |          6000
 113 | Boeing 767      |          5500
 114 | Airbus A321     |          3200
 115 | Antonov AN-225  |          9000
(15 rows)

airline_db=# SELECT * FROM Employees;
 eid |  ename  | salary 
-----+---------+--------
   1 | Rahul   |  90000
   2 | Saksham | 120000
   3 | Aman    |  70000
   4 | Priya   |  85000
   5 | Karan   |  95000
   6 | Rohit   | 110000
   7 | Simran  |  75000
   8 | Neha    | 130000
   9 | Arjun   |  98000
  10 | Anjali  |  87000
  11 | Vikas   |  65000
  12 | Pooja   |  72000
  13 | Manav   | 150000
  14 | Isha    |  92000
  15 | Dev     |  88000
  16 | Tanya   |  97000
  17 | Harsh   | 101000
  18 | Nitin   |  68000
  19 | Sneha   |  79000
  
  
 queary(a)
 
airline_db=# SELECT a.aname
airline_db-# FROM Aircraft a
airline_db-# JOIN Certified c
airline_db-# ON a.aid = c.aid
airline_db-# JOIN Employees e
airline_db-# ON c.eid = e.eid
airline_db-# GROUP BY a.aname
airline_db-# HAVING MIN(e.salary) > 80000;
      aname      
-----------------
 Airbus A380
 Airbus A320
 Boeing 767
 Boeing 787
 Boeing 737
 Boeing 777
 Bombardier CRJ
 Dassault Falcon
 Boeing 747
 Gulfstream G650
 Antonov AN-225
 ATR 72
 Airbus A321

  20 | Yash    | 140000
(20 rows)


queary(b)


airline_db=# SELECT c.eid, MAX(a.cruisingrange)
airline_db-# FROM Certified c
airline_db-# JOIN Aircraft a
airline_db-# ON c.aid = a.aid
airline_db-# GROUP BY c.eid
airline_db-# HAVING COUNT(c.aid) > 3;
 eid | max 
-----+-----
(0 rows)

queary 3

airline_db=# SELECT DISTINCT e.ename
airline_db-# FROM Employees e
airline_db-# JOIN Certified c
airline_db-# ON e.eid = c.eid
airline_db-# WHERE e.salary < (
airline_db(#     SELECT MIN(price)
airline_db(#     FROM Flights
airline_db(#     WHERE source = 'Los Angeles'
airline_db(#     AND destination = 'Honolulu'
airline_db(# );
 ename 
-------
(0 rows)

queary 5

airline_db=# SELECT * FROM Certified;
airline_db=# SELECT DISTINCT e.ename
airline_db-# FROM Employees e
airline_db-# JOIN Certified c
airline_db-# ON e.eid = c.eid
airline_db-# JOIN Aircraft a
airline_db-# ON c.aid = a.aid
airline_db-# WHERE a.aname LIKE 'Boeing%';
  ename
---------
 Harsh
 Isha
 Karan
 Manav
 Neha
 Priya
 Rahul
 Rohit
 Saksham
 Yash
(10 rows)

Find the names of pilots certified for some Boeing aircraft?

airline_db=# SELECT DISTINCT e.ename
airline_db-# FROM Employees e
airline_db-# JOIN Certified c
airline_db-# ON e.eid = c.eid
airline_db-# JOIN Aircraft a
airline_db-# ON c.aid = a.aid
airline_db-# WHERE a.aname LIKE 'Boeing%';
  ename  
---------
 Harsh
 Isha
 Karan
 Manav
 Neha
 Priya
 Rahul

 Rohit
 Saksham
 Yash
(10 rows)

airline_db=# 



queary7

airline_db=# SELECT f.source, f.destination
airline_db-# FROM Flights f
airline_db-# WHERE NOT EXISTS (
airline_db(#     SELECT e.eid
airline_db(#     FROM Employees e
airline_db(#     WHERE e.salary > 100000
airline_db(#     AND NOT EXISTS (
airline_db(#         SELECT *
airline_db(#         FROM Certified c
airline_db(#         JOIN Aircraft a
airline_db(#         ON c.aid = a.aid
airline_db(#         WHERE c.eid = e.eid
airline_db(#         AND a.cruisingrange >= f.distance
airline_db(#     )
airline_db(# );
    source     | destination 
---------------+-------------
 Los Angeles   | Chicago
 Los Angeles   | Honolulu
 Madison       | New York
 Chicago       | New York
 Madison       | Chicago
 Dallas        | Miami
 Houston       | Seattle
 Boston        | Denver
 Atlanta       | Las Vegas
 San Francisco | New York
 Chicago       | Houston
 Miami         | Boston
 Seattle       | Los Angeles
 Denver        | Atlanta
 Las Vegas     | Dallas
 London        | Paris
 Paris         | Dubai
 Dubai         | Delhi
 Delhi         | Singapore
(19 rows)

airline_db=# 


query 8


airline_db=# SELECT DISTINCT e.ename
airline_db-# FROM Employees e
airline_db-# JOIN Certified c
airline_db-# ON e.eid = c.eid
airline_db-# JOIN Aircraft a
airline_db-# ON c.aid = a.aid
airline_db-# WHERE a.cruisingrange > 3000
airline_db-# AND e.eid NOT IN (
airline_db(#     SELECT c.eid
airline_db(#     FROM Certified c
airline_db(#     JOIN Aircraft a
airline_db(#     ON c.aid = a.aid
airline_db(#     WHERE a.aname LIKE 'Boeing%'
airline_db(# );
 ename  
--------
 Tanya
 Anjali
(2 rows)

query 9

airline_db=# SELECT DISTINCT f1.departs
airline_db-# FROM Flights f1
airline_db-# WHERE f1.source = 'Madison'
airline_db-# AND f1.destination = 'New York'
airline_db-# AND f1.arrives <= '18:00'
airline_db-# 
airline_db-# UNION
airline_db-# 
airline_db-# SELECT DISTINCT f1.departs
airline_db-# FROM Flights f1
airline_db-# JOIN Flights f2
airline_db-# ON f1.destination = f2.source
airline_db-# WHERE f1.source = 'Madison'
airline_db-# AND f2.destination = 'New York'
airline_db-# AND f2.arrives <= '18:00';
 departs  
----------`
9:00:00
 10:00:00
(2 rows)

query 10

airline_db=# SELECT
airline_db-# (
airline_db(#     SELECT AVG(e.salary)
airline_db(#     FROM Employees e
airline_db(#     JOIN Certified c
airline_db(#     ON e.eid = c.eid
airline_db(# )
airline_db-# -
airline_db-# (
airline_db(#     SELECT AVG(salary)
airline_db(#     FROM Employees
airline_db(# )
airline_db-# AS salary_difference;
 salary_difference 
-------------------
 8828.571428571429
(1 row)

query 11


airline_db=# SELECT ename, salary
airline_db-# FROM Employees
airline_db-# WHERE eid NOT IN (
airline_db(#     SELECT eid
airline_db(#     FROM Certified
airline_db(# )
airline_db-# AND salary > (
airline_db(#     SELECT AVG(e.salary)
airline_db(#     FROM Employees e
airline_db(#     JOIN Certified c
airline_db(#     ON e.eid = c.eid
airline_db(# );
 ename | salary 
-------+--------
(0 rows)

airline_db=# 

query 12

SELECT DISTINCT e.ename
FROM Employees e
WHERE e.eid NOT IN (
    SELECT c.eid
    FROM Certified c
    JOIN Aircraft a
    ON c.aid = a.aid
    WHERE a.cruisingrange <= 1000
);


query 13

airline_db=# SELECT e.ename
airline_db-# FROM Employees e
airline_db-# JOIN Certified c
airline_db-# ON e.eid = c.eid
airline_db-# JOIN Aircraft a
airline_db-# ON c.aid = a.aid
airline_db-# GROUP BY e.eid, e.ename
airline_db-# HAVING MIN(a.cruisingrange) > 1000
airline_db-# AND COUNT(c.aid) >= 2;
  ename  
---------
 Anjali
 Manav
 Saksham
 Neha
 Priya
 Rohit
 Arjun
 Isha
 Yash
 Rahul
 Harsh
(11 rows)


query 14

airline_db=# SELECT DISTINCT e.ename
airline_db-# FROM Employees e
airline_db-# JOIN Certified c
airline_db-# ON e.eid = c.eid
airline_db-# JOIN Aircraft a
airline_db-# ON c.aid = a.aid
airline_db-# GROUP BY e.eid, e.ename
airline_db-# HAVING MIN(a.cruisingrange) > 1000
airline_db-# AND SUM(
airline_db(#     CASE
airline_db(#         WHEN a.aname LIKE 'Boeing%' THEN 1
airline_db(#         ELSE 0
airline_db(#     END
airline_db(# ) > 0;
  ename  
---------
 Rahul
 Neha
 Harsh
 Manav
 Rohit
 Yash
 Isha
 Priya
 Saksham
 Karan
(10 rows)

airline_db=# SELECT e.ename, a.aid
airline_db-# FROM Employees e
airline_db-# JOIN Certified c
airline_db-# ON e.eid = c.eid
airline_db-# JOIN Aircraft a
airline_db-# ON c.aid = a.aid;
airline_db=# 


 ename  | aid 
---------+-----
 Rahul   | 101
 Rahul   | 102
 Saksham | 101
 Saksham | 103
 Saksham | 105
 Aman    | 104
 Priya   | 102
 Priya   | 103
 Karan   | 105
 Rohit   | 106
 Rohit   | 107
 Simran  | 108
 Neha    | 101
 Neha    | 106
 Neha    | 115
 Arjun   | 109
 Arjun   | 110
 Anjali  | 111
 Anjali  | 112
 Vikas   | 104
 Pooja   | 108
 Manav   | 115
 Manav   | 107
 Manav   | 111
 Isha    | 103
 Isha    | 114
 Dev     | 110
 Tanya   | 112
 Harsh   | 113
 Harsh   | 101
 Nitin   | 104
 Sneha   | 108
 Yash    | 115
 Yash    | 106
 Yash    | 107



airline_db=# SELECT e.ename, a.aname
airline_db-# FROM Employees e
airline_db-# JOIN Certified c
airline_db-# ON e.eid = c.eid
airline_db-# JOIN Aircraft a
airline_db-# ON c.aid = a.aid
airline_db-# WHERE a.cruisingrange > 5000;
  ename  |      aname      
---------+-----------------
 Saksham | Boeing 777
 Karan   | Boeing 777
 Rohit   | Airbus A380
 Rohit   | Boeing 787
 Neha    | Airbus A380
 Neha    | Antonov AN-225
 Anjali  | Gulfstream G650
 Anjali  | Dassault Falcon
 Manav   | Antonov AN-225
 Manav   | Boeing 787
 Manav   | Gulfstream G650
 Tanya   | Dassault Falcon
 Harsh   | Boeing 767
 Yash    | Antonov AN-225
 Yash    | Airbus A380
 Yash    | Boeing 787
(16 rows)




airline_db=# SELECT e.ename, a.aname
airline_db-# FROM Employees e
airline_db-# JOIN Certified c
airline_db-# ON e.eid = c.eid
airline_db-# JOIN Aircraft a
airline_db-# ON c.aid = a.aid
airline_db-# WHERE a.cruisingrange > 3000
airline_db-# AND a.aname LIKE 'Boeing%';
  ename  |   aname    
---------+------------
 Rahul   | Boeing 747
 Saksham | Boeing 747
 Saksham | Boeing 737
 Saksham | Boeing 777
 Priya   | Boeing 737
 Karan   | Boeing 777
 Rohit   | Boeing 787
 Neha    | Boeing 747
 Manav   | Boeing 787
 Isha    | Boeing 737
 Harsh   | Boeing 767
 Harsh   | Boeing 747
 Yash    | Boeing 787







airline_db=# SELECT e.ename, e.salary
airline_db-# FROM Employees e
airline_db-# JOIN Certified c
airline_db-# ON e.eid = c.eid
airline_db-# JOIN Aircraft a
airline_db-# ON c.aid = a.aid
airline_db-# WHERE a.aname LIKE 'Boeing%';
  ename  | salary 
---------+--------
 Rahul   |  90000
 Saksham | 120000
 Saksham | 120000
 Saksham | 120000
 Priya   |  85000
 Karan   |  95000
 Rohit   | 110000
 Neha    | 130000
 Manav   | 150000
 Isha    |  92000
 Harsh   | 101000
 Harsh   | 101000
 Yash    | 140000







airline_db=# SELECT e.ename
airline_db-# FROM Employees e
airline_db-# JOIN Certified c
airline_db-# ON e.eid = c.eid
airline_db-# JOIN Aircraft a
airline_db-# ON c.aid = a.aid
airline_db-# WHERE a.cruisingrange > 4000;
  ename  
---------
 Rahul
 Saksham
 Saksham
 Karan
 Rohit
 Rohit
 Neha
 Neha
 Neha
 Anjali
 Anjali
 Manav
 Manav
 Manav
 Tanya
 Harsh
 Harsh
 Yash
 Yash
 Yash







airline_db=# SELECT e.ename
airline_db-# FROM Employees e
airline_db-# JOIN Certified c
airline_db-# ON e.eid = c.eid
airline_db-# JOIN Aircraft a
airline_db-# ON c.aid = a.aid
airline_db-# WHERE a.aname LIKE 'Boeing%';
  ename  
---------
 Rahul
 Saksham
 Saksham
 Saksham
 Priya
 Karan
 Rohit
 Neha
 Manav
 Isha
 Harsh
 Harsh
 Yash


practice

Q1

Query
SELECT user_id, COUNT(*)
FROM Orders
GROUP BY user_id;

Q2.
Query
SELECT user_id, SUM(amount)
FROM Orders
GROUP BY user_id;


Q3. 
Query
SELECT user_id, AVG(amount)
FROM Orders
GROUP BY user_id;

