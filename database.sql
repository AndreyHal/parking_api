create TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    num_of_car VARCHAR(255)
);

create TABLE parking(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    city VARCHAR(255),
    street VARCHAR(255),
    house VARCHAR(255),
    count_place INTEGER,
    price INTEGER,
    free_places BOOLEAN
);

create TABLE photo(
    id SERIAL PRIMARY KEY,
    src BYTEA,
    main BOOLEAN,
    parking_id INTEGER,
    FOREIGN KEY (parking_id) REFERENCES parking (id)
);

create TABLE reservation(
    id SERIAL PRIMARY KEY,
    creating TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_start DATE,
    date_end DATE,
    user_id INTEGER,
    parking_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id)
);