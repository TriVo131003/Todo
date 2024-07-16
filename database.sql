CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles (role_id) ON DELETE CASCADE
);

CREATE TABLE todos (
    todo_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assignments (
    assignment_id SERIAL PRIMARY KEY,
    todo_id INT NOT NULL,
    user_id INT NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (todo_id) REFERENCES todos (todo_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE todo_log (
    id SERIAL PRIMARY KEY,
    todo_id INT NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    event_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    description TEXT,
    old_value JSONB,
    new_value JSONB
);

ALTER TABLE todo_log
ADD CONSTRAINT fk_todo_log_todo
FOREIGN KEY (todo_id) REFERENCES todos(todo_id);

ALTER TABLE todo_log
ADD CONSTRAINT fk_todo_log_user
FOREIGN KEY (user_id) REFERENCES users(user_id);

