CREATE USER 'fullstackapp'@'localhost' IDENTIFIED BY 'fullstackpass';

GRANT ALL PRIVILEGES ON `fullstackproject-db`.* TO 'fullstackapp'@'localhost';

ALTER USER 'fullstackapp'@'localhost' IDENTIFIED WITH mysql_native_password BY 'fullstack';