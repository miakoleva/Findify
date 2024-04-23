create table users(
    id bigserial primary key,
    first_name text not null,
    last_name text not null,
    phone_number text not null,
    email text not null,
    password text not null,
    user_role text
);

create table categories(
     id bigserial primary key,
     category_name text not null
);

create table posts(
    id bigserial primary key,
    status text,
    image BYTEA,
    user_id bigserial not null references users(id),
    municipality_id bigserial not null  references municipalities(id),
    category_id bigserial not null references categories(id)
);

create table comments(
    id bigserial primary key,
    comment text,
    post_id bigserial not null references posts(id)
);


