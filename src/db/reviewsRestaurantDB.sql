CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	role VARCHAR(20) NOT NULL DEFAULT 'user',
	CHECK (role IN ('admin', 'user'))
);

CREATE TABLE restaurant (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	address VARCHAR(255) NOT NULL,
	category VARCHAR(50) NOT NULL
);

CREATE TABLE reviews (
	id SERIAL PRIMARY KEY,
	userID INTEGER NOT NULL,
	restaurantId INTEGER NOT NULL,
	score INTEGER NOT NULL,
	CHECK (score >=1 AND score <=5),
	title VARCHAR(100) NOT NULL,
	description TEXT NOT NULL,
	FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (restaurantId) REFERENCES restaurant(id) ON DELETE CASCADE ON UPDATE CASCADE
	
);