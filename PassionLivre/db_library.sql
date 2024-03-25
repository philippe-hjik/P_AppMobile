/*
#################### Update Part (t_users) ####################
*/

INSERT INTO t_users(username_user, password_user, nbBooksOffer_user, nbNote_user, nbComment_user, created, updatedAt) 
VALUES ("etml", "$2b$10$TV4DZOedGSlPJO/cj2SBieCBfoL6vlQvQHjtVIbZRot9znafxwtAW", 0, 0, 0, NOW(), NOW());

INSERT INTO t_users(username_user, password_user, nbBooksOffer_user, nbNote_user, nbComment_user, created, updatedAt) 
VALUES ("alomenoud", "$2b$10$TV4DZOedGSlPJO/cj2SBieCBfoL6vlQvQHjtVIbZRot9znafxwtAW", 1, 1, 1, NOW(), NOW());

INSERT INTO t_users(username_user, password_user, nbBooksOffer_user, nbNote_user, nbComment_user, created, updatedAt) 
VALUES ("phiheijkoop", "$2b$10$TV4DZOedGSlPJO/cj2SBieCBfoL6vlQvQHjtVIbZRot9znafxwtAW", 1, 1, 1, NOW(), NOW());

INSERT INTO t_users(username_user, password_user, nbBooksOffer_user, nbNote_user, nbComment_user, created, updatedAt) 
VALUES ("tiasousa", "$2b$10$TV4DZOedGSlPJO/cj2SBieCBfoL6vlQvQHjtVIbZRot9znafxwtAW", 0, 0, 0, NOW(), NOW());

INSERT INTO t_users(username_user, password_user, nbBooksOffer_user, nbNote_user, nbComment_user, created, updatedAt) 
VALUES ("eviparamanathan", "$2b$10$TV4DZOedGSlPJO/cj2SBieCBfoL6vlQvQHjtVIbZRot9znafxwtAW", 0, 0, 0, NOW(), NOW());

INSERT INTO t_users(username_user, password_user, nbBooksOffer_user, nbNote_user, nbComment_user, created, updatedAt) 
VALUES ("ethschafstall", "$2b$10$TV4DZOedGSlPJO/cj2SBieCBfoL6vlQvQHjtVIbZRot9znafxwtAW", 0, 0, 0, NOW(), NOW());

/*
#################### Update Part (t_authors) ####################
*/

INSERT INTO t_authors(firstName_author, lastName_author, createdAt, updatedAt) 
VALUES ("J. K.", "Rowling", NOW(), NOW());

INSERT INTO t_authors(firstName_author, lastName_author, createdAt, updatedAt) 
VALUES ("Tui-T", "Sutherland", NOW(), NOW());

/*
#################### Update Part (t_categories) ####################
*/

INSERT INTO t_categories(name_category, createdAt, updatedAt)
VALUES ("Fantastique", NOW(), NOW());

INSERT INTO t_categories(name_category, createdAt, updatedAt)
VALUES ("Policier", NOW(), NOW());

INSERT INTO t_categories(name_category, createdAt, updatedAt)
VALUES ("Science Fiction", NOW(), NOW());

INSERT INTO t_categories(name_category, createdAt, updatedAt)
VALUES ("Aventure", NOW(), NOW());

INSERT INTO t_categories(name_category, createdAt, updatedAt)
VALUES ("Autobiographique", NOW(), NOW());

/*
#################### Update Part (t_publishers) ####################
*/

INSERT INTO t_publishers(name_publisher, createdAt, updatedAt)
VALUES ("Folio Junior", NOW(), NOW());

INSERT INTO t_publishers(name_publisher, createdAt, updatedAt)
VALUES ("Gallimard Jeunesse", NOW(), NOW());


/*
#################### Update Part (t_books) ####################
*/
-- Insertion 1
INSERT INTO t_books (title_book, pages_book, extract_book, summary_book, cover_book, year_book, average_book, upload_book, fk_publisher, fk_author, fk_category, fk_user, created, updatedAt)
VALUES 
('Le Seigneur des Anneaux', 1178, 'Dans les terres de la Terre du Milieu, une quête épique commence...', 'Un jeune hobbit nommé Frodo Baggins est chargé de détruire un anneau puissant pour sauver le monde du Seigneur des Ténèbres, Sauron.', 'images/lotr.jpg', 1954, 4.8, 'livres/le_seigneur_des_anneaux.pdf', 1, 1, 2, 2, NOW(), NOW());

-- Insertion 2
INSERT INTO t_books (title_book, pages_book, extract_book, summary_book, cover_book, year_book, average_book, upload_book, fk_publisher, fk_author, fk_category, fk_user, created, updatedAt)
VALUES 
('1984', 328, 'Dans un monde dystopique, la surveillance gouvernementale est omniprésente...', 'Winston Smith lutte contre un régime totalitaire dirigé par le Parti et son chef, Big Brother.', 'images/1984.jpg', 1949, 4.6, 'livres/1984.pdf', 2, 2, 3, 4, NOW(), NOW());

-- Insertion 3
INSERT INTO t_books (title_book, pages_book, extract_book, summary_book, cover_book, year_book, average_book, upload_book, fk_publisher, fk_author, fk_category, fk_user, created, updatedAt)
VALUES 
('Harry Potter à l\'école des sorciers', 332, 'Dans le monde magique, un jeune garçon découvre son héritage et son destin...', 'Harry Potter apprend qu\'il est un sorcier et commence sa première année à Poudlard, une école de sorcellerie.', 'images/harry_potter.jpg', 1997, 4.7, 'livres/harry_potter_a_l_ecole_des_sorciers.pdf', 2, 2, 1, 2, NOW(), NOW());

-- Insertion 4
INSERT INTO t_books (title_book, pages_book, extract_book, summary_book, cover_book, year_book, average_book, upload_book, fk_publisher, fk_author, fk_category, fk_user, created, updatedAt)
VALUES 
('Le Petit Prince', 96, 'Un jeune prince voyage à travers les étoiles et rencontre divers personnages...', 'Le Petit Prince découvre l\'amour, l\'amitié et la responsabilité lors de son voyage.', 'images/le_petit_prince.jpg', 1943, 4.9, 'livres/le_petit_prince.pdf', 2, 2, 2, 1, NOW(), NOW());


/*
#################### Update Part (t_comments) ####################
*/

INSERT INTO t_comments(note_comment, text_comment, createdAt, updatedAt, fk_book, fk_user)
VALUES (4, "Livre très intéressant et attractif, je recommande aux jeunes lecteurs comme au plus âgés", NOW(), NOW(), 2, 1);

INSERT INTO t_comments(note_comment, text_comment, createdAt, updatedAt, fk_book, fk_user)
VALUES (5, "Livre extraordinaire et immersif", NOW(), NOW(), 1, 2);
