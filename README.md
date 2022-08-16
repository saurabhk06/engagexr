# EngageXr coding assignment

This project contains the backend code for the EngageXr coding assigment.

## Features covered

- Used Typescript in the project
- Implemented Typescript Sequelize
- Basic JWT Authentication: ability to log in as administrator
- Used Node, Express, Sequelize, Sequelize-Typescript, JWT, ESlint, Prettier, Winston Logger, express-validator
- Created Express routing to demonstrate CRUD functionality (Create / Read / Update / Delete) for two API items: Companies and Employees
- Used Express validation middleware to demonstrate basic payload validation
- Used Express middleware to enforce authorisation
- Companies DB table consists of these fields: Name (required), email, phone, website
- Employees DB table consists of these fields: First name (required), last name (required), Company (foreign key to Companies), email, phone
- User DB table (Additional table to enforce log in as admin functionality)

## Important Instructions

- This project is built with MySQL as database choice. Please setup MySQL in the system before installing and running the project.
- After installing MySQL in the system, create a database inside.
- Once you setup your mysql database you need to set the database name, username, password in **src/configs/sequelizeconfig.ts file**

| key        | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `database` | `string` | **Your MYSql database name**. |
| `username` | `string` | **Your username**             |
| `password` | `string` | **Your password**.            |

- All the API reference is given in the API Reference docs. However, to ease API testing there is a POSTMAN api JSON file added in the root of the project **(/postman/engagexr-apis.postman_collection.json)** directory. Import this file in the POSTMAN application and test the API with pre-loaded data. More info about API's is given in the API Reference section.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SECRET=35c452171f3505f6516011ed1945212`

## Run Locally

Clone the project

```bash
  git clone https://github.com/saurabhk06/engagexr.git
```

Go to the project directory

```bash
  cd engagexr
```

Install dependencies

```bash
  npm install
```

Start the server locally

```bash
  npm run dev
```

## Build

```bash
  npm run build
```

## Tech Stack

**Server:** Node, Express, Sequelize, JWT, Eslint, prettier, Winston

## API Reference

### Auth API

#### Signup user

```http
  POST http://localhost:4000/api/signup
```

| Body Payload | Type     | Description                                |
| :----------- | :------- | :----------------------------------------- |
| `firstName`  | `string` | **Required**.                              |
| `lastName`   | `string` | **Required**.                              |
| `email`      | `string` | **Required**.                              |
| `password`   | `string` | **Required**.                              |
| `role`       | `string` | **OPTIONAL: GUEST/ADMIN**. Defaults. GUEST |

#### Signin user

```http
  POST http://localhost:4000/api/signin
```

| Body Payload | Type     | Description   |
| :----------- | :------- | :------------ |
| `email`      | `string` | **Required**. |
| `password`   | `string` | **Required**. |

### Company API

All the company API requires Authorisation header containing Bearer Token and Content-Type header

- use the Signin API shown above to generate the token.
  | Headers | Type | value |
  | :-------- | :------- | :------------------------- |
  | `Content-Type` | `string` | **application/json**. |
  | `Authorization` | `string` | **Bearer [YOUR_TOKEN]**. |

#### Create a new company

```http
  POST http://localhost:4000/api/create-company
```

| Body Payload | Type     | Description   |
| :----------- | :------- | :------------ |
| `name`       | `string` | **Required**. |
| `email`      | `string` | **Required**. |
| `phone`      | `string` | **OPTIONAL**. |
| `website`    | `string` | **OPTIONAL**. |

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

#### Get all companies

```http
  GET http://localhost:4000/api/companies
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

#### Get company by company id.

```http
  GET http://localhost:4000/api/company/:companyId
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

#### Update company by company id.

```http
  PATCH http://localhost:4000/api/company/:companyId
```

| Body Payload | Type     | Description   |
| :----------- | :------- | :------------ |
| `name`       | `string` | **OPTIONAL**. |
| `email`      | `string` | **OPTIONAL**. |
| `phone`      | `string` | **OPTIONAL**. |
| `website`    | `string` | **OPTIONAL**. |

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

#### Delete company by company id.

```http
  DELETE http://localhost:4000/api/company/:companyId
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

### Employee API

All the employee API requires Authorisation header containing Bearer Token and Content-Type header

- use the Signin API shown above to generate the token.
  | Headers | Type | value |
  | :-------- | :------- | :------------------------- |
  | `Content-Type` | `string` | **application/json**. |
  | `Authorization` | `string` | **Bearer [YOUR_TOKEN]**. |

#### Create a new employee

```http
  POST http://localhost:4000/api/create-employee
```

| Body Payload | Type     | Description   |
| :----------- | :------- | :------------ |
| `companyId`  | `number` | **Required**. |
| `firstName`  | `string` | **Required**. |
| `lastName`   | `string` | **Required**. |
| `email`      | `string` | **Required**. |
| `phone`      | `string` | **OPTIONAL**. |

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

#### Get all employees

```http
  GET http://localhost:4000/api/employees
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

#### Get employee by employee id.

```http
  GET http://localhost:4000/api/employee/:employeeId
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

#### Get employee by company id.

```http
  GET http://localhost:4000/api/company/:companyId/employees
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

#### Update employee by employee id.

```http
  PATCH http://localhost:4000/api/employee/:employeeId
```

| Body Payload | Type     | Description   |
| :----------- | :------- | :------------ |
| `firstName`  | `string` | **OPTIONAL**. |
| `lastName`   | `string` | **OPTIONAL**. |
| `email`      | `string` | **OPTIONAL**. |
| `phone`      | `string` | **OPTIONAL**. |

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

#### Delete employee by employee id.

```http
  DELETE http://localhost:4000/api/employee/:employeeId
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `Content-Type`  | `string` | **Required**. |
| `Authorization` | `string` | **Required**. |

## Author

- Saurabh Kumar (DamcoGroup)
