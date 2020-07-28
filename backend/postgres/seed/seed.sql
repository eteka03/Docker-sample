BEGIN TRANSACTION;

INSERT into users (name,email, entries,joined) values ('abel','abel@gmail.com',7,'2020-03-03');
INSERT into login (hash,email) values ('xxx5x657980wennfjkgpp','abel@gmail.com');

COMMIT