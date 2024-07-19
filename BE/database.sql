CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP,
    create_by INT,
    update_by INT,
    FOREIGN KEY (create_by) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (update_by) REFERENCES users (user_id) ON DELETE CASCADE
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
    updated_at TIMESTAMP,
    create_by INT,
    update_by INT,
    FOREIGN KEY (create_by) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (update_by) REFERENCES users (user_id) ON DELETE CASCADE
);

-- Table for assigning todos to users
CREATE TABLE assignments (
    assignment_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    todo_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    create_by INT,
    update_by INT,
    FOREIGN KEY (create_by) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (update_by) REFERENCES users (user_id) ON DELETE CASCADE,
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

INSERT INTO users (username, email, password_hash) 
VALUES ('admin', 'admin@admin.com', '$2a$10$EcAM22N3EjiXngkV1J5ZMOuVao7mmXnPnBC95WFpBY1n.48r6uzQe');

INSERT INTO user_roles(user_id, role_id)
VALUES (1,1);