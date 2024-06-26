# Pantyr Assignment
This repository contains a skeleton of an Express application written in TypeScript as a basis for an API of a web store.

## Getting Started
To work on this assignment, you need to fork this repository. After that and cloning the fork, you should run `npm i` to install the dependencies. It is recommended to use Volta to have the correct versions of Node and NPM, but it is not required. To install Volta, follow the instruction on [Volta: Getting Started](https://docs.volta.sh/guide/getting-started).

After installation is complete, you can start the app by either `npm start` or `npm start:watch`. The latter is useful during development, as it watches the source files and restart the server if there are any changes.

Once you're done with the assignment, create a PR to merge in the `main` branch of this repository.

## Assignment
Our store sells products, but currently there is no way to order any products. Your assignment is to implement:
- a paginated endpoint that returns a list of products
- an endpoint to place orders

You can build a REST API or GraphQL API, the choice is yours.

Our database consists of JSON files in the `db` folder. We currently have a collection of [products](./db/products.json) and an [empty collection](./db/orders.json) for our incoming orders. You can read the JSON files into memory (since there aren't that many items) or you can setup an actual database and use those files as your seed data.

*Bonus points if you use the Repository Pattern.*
