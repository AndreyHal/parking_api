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

--select *, case when parking.id in (select parking_id from favorite where user_id=9) then true else false end as is_favorite from parking;   //!!!!!!!!

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
    count_place INTEGER,
    price INTEGER,
    free_places BOOLEAN
);
-- нет в бд
create TABLE photo(
    id SERIAL PRIMARY KEY,
    path VARCHAR(255),
    main BOOLEAN,
    parking_id INTEGER,
    FOREIGN KEY (parking_id) REFERENCES parking (id)
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