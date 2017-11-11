DROP DATABASE IF EXISTS crypto_piggy;
CREATE DATABASE crypto_piggy;

\c crypto_piggy;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  hash_pass VARCHAR NOT NULL,
  created_at timestamp default current_timestamp
);

CREATE TABLE addresses (
  ID SERIAL PRIMARY KEY,
  user_id integer REFERENCES users (ID) NOT NULL,
  address VARCHAR NOT NULL,
  created_at timestamp default current_timestamp
);

CREATE TABLE performance_history (
  ID SERIAL PRIMARY KEY,
  user_id integer REFERENCES users (ID) NOT NULL,
  created_at timestamp default current_timestamp,
  portfolio_value VARCHAR NOT NULL,
  amount_eth VARCHAR NOT NULL
);

INSERT INTO users (ID, username, hash_pass, created_at)
  VALUES (1, 'ianh', '$2a$10$VBX3tQbf/dj6Y73TMrOakeNUQe.6u.wtbnpl/w8wFiWtWrzDp.oY6', '2017-10-25 12:36:53.71262');

INSERT INTO users (ID, username, hash_pass)
    VALUES (2, 'sam', '$2a$10$VBX3tQbf/dj6Y73TMrOakeNUQe.6u.wtbnpl/w8wFiWtWrzDp.oY6');

INSERT INTO addresses (ID, user_id, address)
  VALUES (1, 1, '0x64042ba68b12d4c151651ca2813b7352bd56f08e');

INSERT INTO addresses (ID, user_id, address)
    VALUES (2, 1, '0x9644d964867ace0534559a5435a1d780a25cf03a');

INSERT INTO addresses (ID, user_id, address)
  VALUES (3, 2, '0xac223b118852b90d63052b3f3e203c3dAe4644C0');

INSERT INTO addresses (ID, user_id, address)
  VALUES (4, 2, '0x38F913e25db0c796C47b0c0A3d25Cf654e982d51');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-10-25 12:36:53.71262', '2.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-10-26 12:36:53.71262', '5.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-10-27 12:36:53.71262', '10.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-10-28 12:36:53.71262', '25.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-10-29 12:36:53.71262', '20.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-10-30 12:36:53.71262', '80.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-10-31 12:36:53.71262', '65.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-01 12:36:53.71262', '82.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-02 12:36:53.71262', '98.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-03 12:36:53.71262', '90.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-04 12:36:53.71262', '120.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-05 12:36:53.71262', '160.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-06 12:36:53.71262', '130.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-07 12:36:53.71262', '180.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-08 12:36:53.71262', '190.53', '30.00000');
