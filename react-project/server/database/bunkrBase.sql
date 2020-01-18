DROP DATABASE IF EXISTS bunkrbase;

CREATE DATABASE bunkrbase;

\c bunkrbase

CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   email VARCHAR UNIQUE,
   img_url VARCHAR,
   loggedIn BOOLEAN
);

CREATE TABLE images (
   id SERIAL PRIMARY KEY,
   img_src VARCHAR,
   users_id INT REFERENCES users(id)
);

CREATE TABLE tags (
   id SERIAL PRIMARY KEY,
   tag_name VARCHAR UNIQUE
);

CREATE TABLE image_tags (
   id SERIAL PRIMARY KEY,
   tag_id INT REFERENCES tags(id),
   img_id INT REFERENCES images(id)
);



INSERT INTO users (email, img_url, loggedIn)
   VALUES('dan@gmail.com','http://pronksiapartments.ee/wp-content/uploads/2015/10/placeholder-face-big.png', false),
         ('serg@gmail.com','http://pronksiapartments.ee/wp-content/uploads/2015/10/placeholder-face-big.png', false);

INSERT INTO images (img_src, users_id)
   VALUES ('https://thumbs.dreamstime.com/b/picturesque-autumn-scenery-santa-maddalena-village-church-road-colorful-trees-meadows-foreground-mountain-peaks-159426189.jpg', 2),
         ('https://images.pexels.com/photos/258109/pexels-photo-258109.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 1),
         ('https://www.recipegirl.com/wp-content/uploads/2017/06/baked-bday-cake-doughnuts-1-600x400.jpg',2);

INSERT INTO tags (tag_name)
   VALUES ('landscapes'),
         ('munchies'),
         ('picoftheday');

INSERT INTO image_tags (tag_id, img_id)
      VALUES (1,1),
            (1,2),
            (2,3),
            (3,1),
            (3,2),
            (3,3);



SELECT * FROM users;
SELECT * FROM images;
SELECT * FROM tags;
SELECT * FROM image_tags;
