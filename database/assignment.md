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
  20 | Yash    | 140000
(20 rows)

