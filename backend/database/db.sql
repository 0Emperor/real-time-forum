CREATE TABLE IF NOT EXISTS  users  (
ID INTEGER PRIMARY KEY AUTOINCREMENT,
age INTEGER NOT NULL,
email TEXT NOT NULL,
password TEXT NOT NULL,
fisrtName  TEXT NOT NULL,
lastName  TEXT NOT NULL ,
gender TEXT NOT NULL,
nickname TEXT NOT NULL,
datecreation DATE,
Session TEXT,
Expired DATE 
);
CREATE TABLE IF NOT EXISTS Posts (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Title char(50),
    Content TEXT, 
    DateCreation DATE,
    ID_User INTEGER,
    FOREIGN KEY (ID_User) REFERENCES users(ID) ON DELETE CASCADE ON UPDATE CASCADE 
);

CREATE TABLE IF NOT EXISTS Category(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name_Category varchar(20) UNIQUE
);

CREATE TABLE IF NOT EXISTS PostCategory(
    ID_Post INTEGER,
    ID_Category INTEGER,
    PRIMARY KEY (ID_Post, ID_Category),
    FOREIGN KEY (ID_Post) REFERENCES Posts(ID) ON DELETE CASCADE ON UPDATE CASCADE, 
    FOREIGN KEY (ID_Category) REFERENCES Category(ID) ON DELETE CASCADE ON UPDATE CASCADE 
);
CREATE TABLE IF NOT EXISTS Comment(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Content TEXT,
    DateCreation DATE,
    ID_User INTEGER,    
    ID_Post INTEGER,
    FOREIGN KEY (ID_User) REFERENCES users(ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (ID_Post) REFERENCES Posts(ID) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS chat(
    sender INTEGER,
    receiver INTEGER,
    Content TEXT NOT NULL,
    createdAt DATE,
        FOREIGN KEY (sender) REFERENCES users(ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (receiver) REFERENCES users(ID) ON DELETE CASCADE ON UPDATE CASCADE


);
INSERT OR IGNORE INTO Category (Name_Category) VALUES ('suffring');
INSERT OR IGNORE INTO Category (Name_Category) VALUES ('pain');

