DROP DATABASE IF EXISTS property;
CREATE DATABASE IF NOT EXISTS property;
USE property;

DROP TABLE IF EXISTS properties;

CREATE TABLE IF NOT EXISTS `properties` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    address varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    state varchar(255) NOT NULL,
    zip varchar(255) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
