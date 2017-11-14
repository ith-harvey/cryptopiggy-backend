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
  VALUES (1, 'ianh', '$2a$10$VBX3tQbf/dj6Y73TMrOakeNUQe.6u.wtbnpl/w8wFiWtWrzDp.oY6', '2017-11-12 00:00:00');

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
  VALUES (1, '2017-11-12 00:00:00', '2.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 01:00:00', '5.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 02:00:00', '11.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 03:00:00', '12.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 04:00:00', '20.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 05:00:00', '80.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 06:00:00', '65.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 07:00:00', '82.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 08:00:00', '98.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 09:00:00', '90.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 10:00:00', '120.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 11:00:00', '160.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 12:00:00', '130.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 13:00:00', '180.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 14:00:00', '190.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 15:00:00', '160.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 16:00:00', '188.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 17:00:00', '192.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 18:00:00', '192.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 19:00:00', '192.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 20:00:00', '192.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 21:00:00', '192.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 22:00:00', '192.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-12 23:00:00', '192.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 00:00:00', '2.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 01:00:00', '5.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 02:00:00', '11.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 03:00:00', '13.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 04:00:00', '20.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 05:00:00', '80.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 06:00:00', '65.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 07:00:00', '82.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 08:00:00', '98.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 09:00:00', '90.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 10:00:00', '120.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 11:00:00', '160.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 12:00:00', '130.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 13:00:00', '180.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 14:00:00', '190.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 15:00:00', '160.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 16:00:00', '188.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 17:00:00', '192.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 18:00:00', '192.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 19:00:00', '192.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 20:00:00', '192.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 21:00:00', '192.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 22:00:00', '192.53', '30.00000');

INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
  VALUES (1, '2017-11-13 23:00:00', '192.53', '30.00000');
