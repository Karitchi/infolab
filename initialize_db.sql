-- Check if the role "infolab" exists; if not, create it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_catalog.pg_roles
        WHERE rolname = 'infolab') THEN
        CREATE USER infolab WITH PASSWORD 'infolab';
    END IF;
END $$;

-- Check if the database "infolab" exists; if not, create it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_database
        WHERE datname = 'infolab') THEN
        CREATE DATABASE infolab OWNER infolab;
    END IF;
END $$;


CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,  -- Added UNIQUE constraint to prevent duplicate emails
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('admin', 'staff')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS announcements (
    announcement_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS classroom_environment_metrics (
    classroom_environment_metrics_id SERIAL PRIMARY KEY,
    temperature DECIMAL(5, 2) NOT NULL,
    humidity DECIMAL(5, 2) NOT NULL,
    air_quality DECIMAL(5, 2) NOT NULL,
    front_sound_level DECIMAL(5, 2) NOT NULL,
    back_sound_level DECIMAL(5, 2) NOT NULL,
    collected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);