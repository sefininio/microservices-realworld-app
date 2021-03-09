

# Microservices Realworld Example App

## A [realworld app](https://github.com/gothinkster/realworld) micro-services implementation, using the following tech stack:
- [NX.dev](https://nx.dev/latest/node/getting-started/getting-started) Monorepo
- [Nest.js](https://docs.nestjs.com/) for BE services
- [Mongoose](https://mongoosejs.com/) using `@nestjs/mongoose` module for persistence
- [GraphQL](https://www.apollographql.com/) using `@nestjs/graphql` module for gateway GraphQL API
- Auth with [passport-jwt](http://www.passportjs.org/packages/passport-jwt/) using `@nestjs/jwt` and `@nestjs/passport` modules
- Global config using `@nestjs/config` module
- TypeScript
- MongoDB - for service persistence layer running in a docker container
- Redis - Queue implementation over Bull and Redis as a service message bus using `@nestjs/bull`

## Application Bootstrap

* Run `docker-compose up -d`
* Create the mongo db:
```
docker exec -it realworld-mongo sh
use realworld
```
* Change `.env` file values if required.
* Run all services using `yarn start:all`
* Use PostMan exported collection `realworld.postman_collection.json` for calling APIs


## The feature micro services are:
* `feature-user` is responsible for `/api/user` functionality and endpoints.
* `feature-tag` is responsible for `/api/tags` functionality and endpoints.
* `feature-profile` is responsible for `/api/profie` functionality and endpoints.
* `feature-article` is responsible for `/api/articles` functionality and endpoints.

## The GraphQL Gateway
* `realworld-examples-app` is the GraphQL gateway for the above services.

## The libs
Feature services and the GraphQL gateway use the following libs:
* `auth` is responsible for user login and issueing the JWT token, as well as exporting the `JwtAuthGuard` used on protected routes in all feature services.
* `models` exposes DTOs and ENUMs used by feature services.
* `shared` exposes reusable services used by feature services.

## Micro services message bus
We use Redis as the queue persistence layer and [Bull](https://optimalbits.github.io/bull/) & `@nestjs/bull` for the queue implementation.

The purpose of this is for feature services to be able to notify something happened in the system, and other feature services can react and complete the flow.

One flow that uses this is:
  - User creates an article, with `tagList` that includes some new tags and some existing tags
  - `feature-article` service publishes a message with the `tagList` to the queue and saves the new article.
  - `feature-tag` implements a consumer that processes the message and creates the new tags in DB.

See Real World App [spec here](https://github.com/gothinkster/realworld/tree/master/api).
