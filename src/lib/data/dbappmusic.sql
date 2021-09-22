CREATE DATABASE dbappMusic;

SHOW TABLES;

CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY ,
    email VARCHAR (255) UNIQUE,
    password VARCHAR (10)
);
DROP TABLE USER;
SELECT * FROM USER;
INSERT INTO user (user_id, email, password) VALUES
 (1,"gus@test.com", "Ma2291624*"),
 (2, "zen@test.com", "Ma2291624*"),
 (3, "joa@test.com", "Ma2291624*");

DESC USER;

SELECT * FROM USER;

CREATE TABLE music (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR (100),
    playlist VARCHAR (255),
    url VARCHAR (255),
    user_id INT (11)
);
ALTER TABLE music ADD FOREIGN KEY(user_id) REFERENCES user(user_id);

INSERT INTO music (id, category, playlist, url) VALUES
 (1,"Rock", "The best new metal", "https://www.youtube.com/watch?v=v0Bu3M4r4K4"),
 (2, "Deep House", "Mega Hits 2020 🌱 The Best Of Vocal Deep House Music Mix 2020 🌱 Summer Music Mix 2020 #96", "https://www.youtube.com/watch?v=-RkQDlUV4Fc"),
 (3, "Reggae", "The Best Of Bob Marley | Bob Marley Greatest Hits Full Album | Bob Marley Reggae Songs", "https://www.youtube.com/watch?v=PdTBriQ71cQ");

DESC MUSIC;

DROP TABLE MUSIC;

SELECT * FROM MUSIC;



