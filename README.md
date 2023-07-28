# Introduction

Welcome to the monorepo for daybreak product code. This project is a monorepo and is being build using [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/). Follow [developer's guide](#developers-guide) to learn more about usage.

We are using [NestJS](https://docs.nestjs.com/) for backend development and [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) for frontend development.

Frontend code is available inside `packages/client` directory and backend code is available inside `packages/server` directory.

## Developer's Guide

Before getting started make sure you have [NodeJS](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/) installed in your local system. If you don't have NodeJS installed, then install using [nvm](https://github.com/nvm-sh/nvm). `v16.13.1` is preferrable version for NodeJS.

### Database

#### First Time Setup

We use mongodb for database. If you don't have mongodb installed in your local system, then refer this [guide](https://www.prisma.io/dataguide/mongodb/setting-up-a-local-mongodb-database#setting-up-mongodb-on-macos). This will help you to install mongodb in your local system. Following this guide, your dbpath would be `/usr/local/var/mongodb`.

We are using [Prisma](https://www.prisma.io/) as ORM for mongodb. Prisma internally uses transactions to communicate with the database which requires us to setup replica sets. To start local development server for database, run:

```
# Open terminal and run the following command
mongod --port=27017 --dbpath=/usr/local/var/mongodb --replSet=rs0

# Open another terminal and run the following command
mongosh
# Inside mongosh shell run the following command
rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]});

# Create a new database named `daybreak` inside mongosh shell
use daybreak

# your new connection String
mongodb://localhost:27017
```

#### Subsequent Runs

Once you complete your one-time setup, you can start your local development server for database by running:

```
mongod --port=27017 --dbpath=/usr/local/var/mongodb --replSet=rs0
```

### Server

To start local development server for backend, run:

```
yarn server
```

### Client

To start local development server for frontend, run:

```
yarn client
```

### Managing dependencies

Since we use Yarn Workspaces we cannot add a new package dependency directly inside a package. We should do so at at the root level, so that the dependency can be shared across packages and locked correctly with `yarn.lock`.

To add a new dependency we need to run the following command:

```
yarn workspace <package_name> add <dependency_name>
```

The `package_name` can be found in the `name` key within `package.json` of each package.

Removing dependencies follows a similar syntax:

```
yarn workspace <package_name> remove <dependency_name>
```
