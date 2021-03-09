

# Microservices Realworld Example App

A [realworld app](https://github.com/gothinkster/realworld) micro-services implementation using:
- [NX.dev](https://nx.dev/latest/node/getting-started/getting-started) Monorepo
- [Nest.js](https://docs.nestjs.com/) for BE services
- [Mongoose](https://mongoosejs.com/) using `@nestjs/mongoose` module for persistence
- [GraphQL](https://www.apollographql.com/) using `@nestjs/graphql` module for gateway GraphQL API
- Auth with [passport-jwt](http://www.passportjs.org/packages/passport-jwt/) using `@nestjs/jwt` and `@nestjs/passport` modules
- Global config using `@nestjs/config` modue
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
