CREATE SCHEMA pawpost;

SET search_path TO pawpost;

-- Tabla de usuarios
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ENUM para el estado de la integración
CREATE TYPE IntegrationStatus AS ENUM ('UP', 'DOWN');

-- Tabla de integraciones disponibles (Instagram, Twitter, etc.)
CREATE TABLE integrations (
    integration_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    status IntegrationStatus DEFAULT 'UP',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Relación entre usuarios e integraciones (qué usuarios han vinculado qué plataformas)
CREATE TABLE users_integrations (
    user_integration_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    integration_id INT NOT NULL REFERENCES integrations ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla de publicaciones de los usuarios
CREATE TABLE posts (
    post_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id INT NOT NULL REFERENCES users ON DELETE CASCADE,
    user_integration_id UUID NOT NULL REFERENCES users_integrations ON DELETE CASCADE,
    title VARCHAR(255),
    description TEXT,
    data JSONB DEFAULT NULL, -- JSONB es mejor para consultas en PostgreSQL
    schedule_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla para almacenar tokens de autenticación de usuarios con OAuth
CREATE TABLE tokens (
    token_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_integration_id UUID NOT NULL REFERENCES users_integrations ON DELETE CASCADE,
    access_token TEXT NOT NULL,
    refresh_token TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
