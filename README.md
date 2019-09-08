# nodejs-express-sequelize-mysql-treasure-game
Treasure game with nodejs, express, sequelize, mysql, jwtwebtoken


# Introduction 
LuckyShine is a game where users can collect treasures in a given latitude and longitude. Every treasure that are collected will have points based on the monetary value. A treasure may have more than one money value, it depends on the user’s luck. Lucky user may get the highest money from the treasure that has been collected.

# To start the project (with docker and docker-compose)
If you already have docker and docker-compose. Open your terminal and go to the project folder.

1. run `docker-compose build`
2. run `docker-compose up`
3. run `docker ps` to get the container id of `app`, and run `docker exec -it {container id} sh` to go into the container.
4. run `sequelize db:migrate` to install the database
5. run `sequellize db:seed:all` to run all the seeding data before you can use the app.
6. go to postman with `localhost` or `127.0.0.0` to access the endpoints.

### Take note
Docker-compose already run nodemon when boot up, so you will not need to run `node index.js`.

# To start the project without docker
You will need to have nodejs pre-installed and mysql pre-configured in your machine.

1. go to project folder and open `config/config.json` and change the `host` for development to `127.0.0.0` and change the root password and database name accordingly.
2. open terminal and nagivate to the project folder, run `npm install` to install all the modules
3. run `npm install -g sequelize-cli` to install sequelize-cli to run migration.
4. run `sequelize db:migrate` to install the database
5. run `sequellize db:seed:all` to run all the seeding data before you can use the app.
6. run `node index.js` to start the project.
7. go to postman with `localhost` or `127.0.0.0` to access the endpoints.


# The endpoints

## POST /login
To know which account you can login, please check for the credentials in `seeders/20190907073018-UserSeeder.js`
required field: email and password

This endpoint return user object and token. You will need the token for other endpoints.

## GET /treasures (You will need to pass in `Authorization`: `Bearer {token}` in headers)
Each treasure will have 1 or more money value. If you pass in `prize_value`, the query will look for the lowest money value in each treasure that meet the search criteria and randomly return 1 record as the prize for the user.

If you don't pass in `prize_value`, query will look for any value in treasure that meet the search criteria and randomly return 1 record as the prize for the user. Users will have chance to get higher money value in the same treasure. 


```
{
	"latitude": "1.3273451" (required),
	"longitude": "103.8756757" (required),
	"distance": 1 or 10 only (required), 
	"prize_value": integer value from 10 to 30 only (nullable)
}
```

## GET /treasures/leaderboard  (You will need to pass in `Authorization`: `Bearer {token}` in headers)
You get to see all user with their total prize won in the response. Highest prize won user will be listed on the top.
