CREATE DATABASE esnproto

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    password VARCHAR(128)
);

CREATE TABLE clanovi (
    id SERIAL PRIMARY KEY,
    ime TEXT DEFAULT '',
    prezime TEXT DEFAULT '',
    datum TEXT DEFAULT '',
    spol TEXT DEFAULT '',
    razina TEXT DEFAULT '', 
    tim TEXT DEFAULT '',
    tel TEXT DEFAULT '',
    email TEXT DEFAULT ''
);

CREATE TABLE eventi (
    id SERIAL PRIMARY KEY,
    ime TEXT DEFAULT '',
    datum TEXT DEFAULT '',
    cijena TEXT DEFAULT '',
    tim TEXT DEFAULT ''
);

CREATE TABLE dolasci (
    id SERIAL PRIMARY KEY,
    clan_id BIGINT NOT NULL REFERENCES clanovi(id),
    event_id BIGINT NOT NULL REFERENCES eventi(id)
);

DROP TABLE dolasci;
DROP TABLE eventi;
DROP TABLE clanovi;
DROP TABLE users;
