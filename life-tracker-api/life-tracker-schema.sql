CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    duration INTEGER,
    intensity INTEGER,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    timestamp TIMESTAMP DEFAULT NOW()
);