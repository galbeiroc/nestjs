# NestJS

Nest (NestJS) is a framework for building efficient, scalable `Node.js` server-side applications. It uses progressive JavaScript, is built with and fully supports `TypeScript` (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

Under the hood, Nest makes use of robust HTTP Server frameworks like `Express` (the default) and optionally can be configured to use `Fastify` as well!

## Installation

To get started, you can either scaffold the project with the Nest CLI, or clone a starter project (both will produce the same outcome).

### Prerequisites

Please make sure that Node.js (version >= 20) is installed on your operating system.

### Setup

Setting up a new project is quite simple with the Nest `CLI`. With npm installed, you can create a new Nest project with the following commands in your OS terminal:

```nest new project-name```

`src/` directory will be created and populated with several core files.

| Resource files | Description |
| :------- | :------- |
| `app.controller.ts` | A basic controller with a single route. |
| `app.controller.spec.ts` | The unit tests for the controller. |
| `app.module.ts` | The root module of the application. |
| `app.service.ts` | A basic service with a single method. |
| `main.ts` | The entry file of the application which uses the core function NestFactory to create a Nest application instance. |

The main.ts includes an async function, which will bootstrap our application:

```ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

you can run the following command to start the application:
`npm run start:dev`

| Commands | Description |
| :------- | :------- |
| new or n [options] [name] | Generate Nest application. |
| build [options] [apps...] | Build Nest application. |
| start [options] [app] | Run Nest application. |
| info or i | Display Nest project details. |
| add [options] < library > | Adds support for an external library to your project. |
| generate or g [options] < schematic > [name] [path] | Generate a Nest element. |

| name          | alias       | description                                  |
| :------------ | :---------- | :------------------------------------------- |
| application   | application | Generate a new application workspace         |
| class         | cl          | Generate a new class                         |
| configuration | config      | Generate a CLI configuration file            |
| controller    | co          | Generate a controller declaration            |
| decorator     | d           | Generate a custom decorator                  |
| filter        | f           | Generate a filter declaration                |
| gateway       | ga          | Generate a gateway declaration               |
| guard         | gu          | Generate a guard declaration                 |
| interceptor   | itc         | Generate an interceptor declaration          |
| interface     | itf         | Generate an interface                        |
| library       | lib         | Generate a new library within a monorepo     |
| middleware    | mi          | Generate a middleware declaration            |
| module        | mo          | Generate a module declaration                |
| pipe          | pi          | Generate a pipe declaration                  |
| provider      | pr          | Generate a provider declaration              |
| resolver      | r           | Generate a GraphQL resolver declaration      |
| resource      | res         | Generate a new CRUD resource                 |
| service       | s           | Generate a service declaration               |
| sub-app       | app         | Generate a new application within a monorepo |

Example:
`nest g resource [name]`
`nest generate module [module name]`
`nest g controller [controller name] --no-spec`

The flag `--no-spec` avoid to create test file.

## Controllers

Controllers are responsible for handling incoming requests and sending responses back to the client.
A controller's purpose is to handle specific requests for the application. The _routing_ mechanism determines which controller will handle each request. Often, a controller has multiple routes, and each route can perform a different action.
To create a basic controller, we use classes and **decorators**.

### Routing

we’ll use the `@Controller()` decorator, which is required to define a basic controller.
Since we've set a prefix (`cats`) for every route and haven't added any specific path in the method decorator, Nest will map `GET/cats` requests to this handler.

```js
import { Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
```

The `@Get()` HTTP request method decorator placed before the findAll() method tells Nest to create a handler for a specific endpoint for HTTP requests.

## Providers

Providers are a core concept in Nest. Many of the basic Nest classes, such as services, repositories, factories, and helpers, can be treated as providers. The key idea behind a provider is that it can be injected as a dependency, allowing objects to form various relationships with each other. The responsibility of "wiring up" these objects is largely handled by the Nest runtime system.

## Modules

A module is a class that is annotated with the `@Module()` decorator. This decorator provides metadata that Nest uses to organize and manage the application structure efficiently.
Every Nest application has at least one module, the root module, which serves as the starting point for Nest to build the application graph.
