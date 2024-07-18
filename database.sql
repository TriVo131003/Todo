CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for storing different roles
CREATE TABLE roles (
    role_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- Junction table to assign roles to users
CREATE TABLE user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles (role_id) ON DELETE CASCADE
);

-- Table for storing todos
CREATE TABLE todos (
    todo_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Table for assigning todos to users
CREATE TABLE assignments (
    assignment_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    todo_id INT NOT NULL,
    user_id INT NOT NULL,
    assigned_at TIMESTAMP,
    FOREIGN KEY (todo_id) REFERENCES todos (todo_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

-- Table for logging events related to todos
CREATE TABLE todo_log (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    todo_id INT NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    event_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    description TEXT,
    old_value JSONB,
    new_value JSONB,
    FOREIGN KEY (todo_id) REFERENCES todos (todo_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

INSERT INTO roles (role_name) VALUES ('admin');
INSERT INTO roles (role_name) VALUES ('user');
