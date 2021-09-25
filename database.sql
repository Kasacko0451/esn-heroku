CREATE DATABASE esnproto

CREATE TABLE "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

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
    ime_eventa TEXT DEFAULT '',
    ime_organizatora TEXT DEFAULT '',
    vrsta_eventa TEXT DEFAULT '',
    datum TEXT DEFAULT '',
    cijena TEXT DEFAULT '',
    tim TEXT DEFAULT '',
    dolasci integer[]
);

DROP TABLE eventi;
DROP TABLE clanovi;
DROP TABLE users;
