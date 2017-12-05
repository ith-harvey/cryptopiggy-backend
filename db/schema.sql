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

INSERT INTO users (username, hash_pass, created_at)
  VALUES ('ianh', '$2a$10$VBX3tQbf/dj6Y73TMrOakeNUQe.6u.wtbnpl/w8wFiWtWrzDp.oY6', '2017-12-04 00:00:00');

INSERT INTO users (username, hash_pass)
    VALUES ('sam', '$2a$10$VBX3tQbf/dj6Y73TMrOakeNUQe.6u.wtbnpl/w8wFiWtWrzDp.oY6');

INSERT INTO addresses (user_id, address)
  VALUES (1, '0x64042ba68b12d4c151651ca2813b7352bd56f08e');

INSERT INTO addresses (user_id, address)
    VALUES (1, '0x9644d964867ace0534559a5435a1d780a25cf03a');

INSERT INTO addresses (user_id, address)
  VALUES (2, '0xac223b118852b90d63052b3f3e203c3dAe4644C0');

INSERT INTO addresses (user_id, address)
  VALUES (2, '0x38F913e25db0c796C47b0c0A3d25Cf654e982d51');

-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 00:00:00', '2.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 01:00:00', '5.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 02:00:00', '11.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 03:00:00', '12.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 04:00:00', '20.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 05:00:00', '80.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 06:00:00', '65.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 07:00:00', '82.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 08:00:00', '98.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 09:00:00', '90.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 10:00:00', '120.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 11:00:00', '160.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 12:00:00', '130.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 13:00:00', '180.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 14:00:00', '190.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 15:00:00', '160.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 16:00:00', '188.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 17:00:00', '192.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 18:00:00', '192.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 19:00:00', '192.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 20:00:00', '192.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 21:00:00', '192.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 22:00:00', '192.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-12-04 23:00:00', '192.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 00:00:00', '2.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 01:00:00', '5.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 02:00:00', '11.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 03:00:00', '13.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 04:00:00', '20.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 05:00:00', '80.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 06:00:00', '65.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 07:00:00', '82.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 08:00:00', '98.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 09:00:00', '90.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 10:00:00', '120.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 11:00:00', '160.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 12:00:00', '130.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 13:00:00', '180.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 14:00:00', '190.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 15:00:00', '160.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 16:00:00', '188.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 17:00:00', '192.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 18:00:00', '192.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 19:00:00', '192.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 20:00:00', '192.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 21:00:00', '192.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 22:00:00', '192.53', '30.00000');
--
-- INSERT INTO performance_history (user_id, created_at, portfolio_value, amount_eth)
--   VALUES (1, '2017-11-05 23:00:00', '192.53', '30.00000');
