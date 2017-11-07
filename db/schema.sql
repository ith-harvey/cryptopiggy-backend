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
  portfolio_value VARCHAR NOT NULL
);

INSERT INTO users (ID, username, hash_pass)
  VALUES (1, 'ianh', '$2a$10$VBX3tQbf/dj6Y73TMrOakeNUQe.6u.wtbnpl/w8wFiWtWrzDp.oY6');

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

INSERT INTO performance_history (user_id, created_at, portfolio_value)
    VALUES (1, '2017-11-07 12:36:53.71262', '180.53');

INSERT INTO performance_history (user_id, created_at, portfolio_value)
    VALUES (1, '2017-11-08 12:36:53.71262', '190.53');

INSERT INTO performance_history (user_id, created_at, portfolio_value)
    VALUES (1, '2017-11-09 12:36:53.71262', '200.53');
