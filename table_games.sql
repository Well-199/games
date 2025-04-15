CREATE TABLE games.game (
	id serial4 NOT NULL,
	title varchar(250) NOT NULL,
	description text NOT NULL,
	platforms varchar NOT NULL,
	releasedate timestamp NOT NULL,
	rating float4 DEFAULT 0 NOT NULL,
	coverimage varchar NULL,
	CONSTRAINT game_pk PRIMARY KEY (id)
);