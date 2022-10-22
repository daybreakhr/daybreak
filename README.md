# Introduction

Welcome to the monorepo for daybreak product code. This project is a monorepo and is being build using [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/). Follow [developer's guide](#developers-guide) to learn more about usage.

We are using [NestJS](https://docs.nestjs.com/) for backend development and [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) for frontend development.

Frontend code is available inside `packages/client` directory and backend code is available inside `packages/server` directory.

## Developer's Guide

Before getting started make sure you have [NodeJS](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/) installed in your local system. If you don't have NodeJS installed, then install using [nvm](https://github.com/nvm-sh/nvm). `v16.13.1` is preferrable version for NodeJS.

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
