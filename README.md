# Project Management API

This project is a Node.js application built with Express, TypeScript, Sequelize ORM, and PostgreSQL. It provides RESTful APIs for managing projects, tasks, and user authentication.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)

## Setup

### 1. Clone the Repository

git clone clone-url
cd project-management

### 1. Install dependecies
npm install
or 
yarn install


### 2. Add database credentials
Go to db\config\config.json and add your database credentials 
{
  "development": {
    "username": "username",
    "password": "password",
    "database": "db-name",
    "host": "host",
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
}

### 3. Run migrations (you should be in root directory)
npx sequelize-cli db:migrate --config db/config/config.json --migrations-path db/migrations

### 4. Run project
npm run dev



