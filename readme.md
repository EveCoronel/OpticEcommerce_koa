# Optic Store API

An API RESTful service for an ecommerce platform selling glasses. This API is built using Koa, a lightweight web framework for Node.js.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
What things you need to install the software and how to install them:

[Node.js](https://nodejs.org/en/)

[NPM (comes with Node.js)](https://www.npmjs.com/https://www.npmjs.com/)

### Installing
A step by step series of examples that tell you how to get a development environment running:

#### Clone the repository to your local machine:

1. git clone (https://github.com/EveCoronel/OpticEcommerce_koa)

2. Install the dependencies:

```
npm install
```

3. Start the development server:

```
npm run start:dev
```

The API should now be up and running on http://localhost:8080/.

## Endpoints
The following endpoints are available in the Optic Store API:

## Product Endpoints
- GET /api/products: Retrieve a list of all products
- GET /api/products/:_id: Retrieve a specific product by ID
- GET /api/products/filter/:category: Retrieve a list of specific products by category
- POST /api/products/: Create a new product
- PUT /api/products/:_id: Update a product
- DELETE /products/:_id: Delete a specific product by ID


### User Endpoints


### Built With

Koa - The web framework used

JavaScript - The programming language used


#### Authors
[Evelyn Coronel](https://github.com/EveCoronel) - Initial work