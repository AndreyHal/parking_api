create TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    role VARCHAR(255) DEFAULT 'person',  --person
    phone VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    num_of_car VARCHAR(255)
);

create TABLE parking(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    role VARCHAR(255) DEFAULT 'parking',  --parking
    phone VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    city VARCHAR(255),
    street VARCHAR(255),
    house VARCHAR(255),
    description VARCHAR(1000) DEFAULT '',
    count_place INTEGER,
    price INTEGER,
    free_places BOOLEAN,
    video_monitoring BOOLEAN DEFAULT FALSE,
    covered_parking BOOLEAN DEFAULT FALSE,
    underground_parking BOOLEAN DEFAULT FALSE,
    motorbike BOOLEAN DEFAULT FALSE,
    car BOOLEAN DEFAULT FALSE,
    truck BOOLEAN DEFAULT FALSE
);
-- нет в бд
create TABLE photo(
    id SERIAL PRIMARY KEY,
    path VARCHAR(255),
    main BOOLEAN,
    parking_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (parking_id) REFERENCES parking (id)
    FOREIGN KEY (user_id) REFERENCES person (id)
);
-----------
create TABLE reservation(
    id SERIAL PRIMARY KEY,
    creating TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_start DATE,
    date_end DATE,
    user_id INTEGER,
    parking_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id),
    FOREIGN KEY (parking_id) REFERENCES parking (id)
);

create TABLE favorite(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    parking_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id),
    FOREIGN KEY (parking_id) REFERENCES parking (id)
);