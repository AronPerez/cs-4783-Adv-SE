# CS4783-DevOps
Howdy, here's how you can run my Node + Express build locally.
# Running Locally

Please follow the steps from top to bottom.
```bash
docker-compose up --build
docker-compose down
```

```sql
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
```

To start the server, run
```bash
yarn start:dev
```
To run Mocha tests, run
```bash
yarn test:dev
```
Open a browser and attempt to access https://localhost:12005
# Progress

A security schema has been added to `swagger.json`, POST /properties, DELETE /properties/{id}, and PUT /properties/{id} are
access-restricted with an API key you must update in `.env`. [Yarn](https://yarnpkg.com/) has been added to help streamline the testing.


# Endpoints

The endpoints in homework 1 are ```/hello``` and ```/swagger.json```, these are accessible by adding the ```/``` to the end of the URL ```localhost:8080```.

The endpoints in homework 2 are ```/properties/``` and any ```/properties/{id}``` wildcard related requests.

API Key validation in homework 3 has been added, you will need to put your API key into the .env folder.
Mocha tests have been implemented with chai and will work for now, but will require ID updates depending on if the DB+Table is fresh

Example:

Input:
```json
{
  "address": "string",
  "city": "string",
  "state": "string",
  "zip": "T"
}
```
Output:
```json
[
  {
    "message": "state length must be less than or equal to 2 characters long"
  },
  {
    "message": "zip length must be at least 5 characters long"
  }
]

