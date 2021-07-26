CREATE DATABASE kasacko

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    password VARCHAR(128),
    deleted Boolean DEFAULT false
);

CREATE TABLE clanovi (
    id SERIAL PRIMARY KEY,
    ime VARCHAR(20),
    prezime VARCHAR(128),
    datum_rođenja VARCHAR,
    spol TEXT,
    razina_clanstva REF

);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    ime TEXT,
    datum_odrzavanja TEXT,

);

CREATE TABLE dolasci (
    id SERIAL PRIMARY KEY,
    clan_id
    event_id
);