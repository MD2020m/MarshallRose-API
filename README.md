# MarshallRose-API
Backend API and database for MarshallRose.com

## Overview
MarshallRose-API serves as the backend and database layer system for the frontend application defined in the MarshallRose.com repository. 

## Tech Stack
Node.js
Express
SQLite
Sequelize

## Routes
Basic CRUD routes defined for Product resource.
Routes for Review resource to be added in future updates

## Setup
To set up MarshallRose-API, clone the repository to your machine. 

In the project folder, run the command `npm install` to install dependencies. 

Next, create a .env file and add entries to store the name of your database in a variable called DB_NAME, the port you will run your localhost development server on in a variable called PORT. You should also create the following two environment variables:
- DB_TYPE = sqlite
- NODE_ENV = development

Once you have defined your environment variables, run `node ./database/setup.js` and `node ./database/seed.js` to setup and seed your database. 

Finally, run `npm start` to start the application on your localhost development server

## Testing
To run unit tests, first run `node ./test_database/test_setup.js` and `node ./test_database/test_seed.js` to setup and seed an independent database for testing.

Once you have setup and seeded the test database, run `npm test` to run unit tests. At this stage, all your tests should pass.
