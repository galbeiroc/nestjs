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

### Resources

Earlier, we defined an endpoint to fetch the cats resource (**GET** route). We'll typically also want to provide an endpoint that creates new records. For this, let's create the **POST** handler:

```ts
import { Controller, Get, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

Nest provides decorators for all of the standard HTTP methods: `@Get()`, `@Post()`, `@Put()`, `@Delete()`, `@Patch()`, `@Options()`, and `@Head()`. In addition, `@All()` defines an endpoint that handles all of them.

### Route wildcards

Pattern-based routes are also supported in NestJS. For example, the asterisk (`*`) can be used as a wildcard to match any combination of characters in a route at the end of a path. In the following example, the `findAll()` method will be executed for any route that starts with `abcd/`, regardless of the number of characters that follow.

```ts
@Get('abcd/*')
findAll() {
  return 'This route uses a wildcard';
}
```

### Route parameters

Routes with static paths won’t work when you need to accept dynamic data as part of the request (e.g., `GET /cats/1` to get the cat with id 1). The route parameter token in the `@Get()` decorator example below illustrates this approach. These route parameters can then be accessed using the `@Param()` decorator.

```ts
@Get(':id')
findOne(@Param('id') id: string): string {
  return `This action returns a #${id} cat`;
}
```

### Status code

As mentioned, the default status code for responses is always **200**, except for POST requests, which default to **201**. You can easily change this behavior by using the `@HttpCode(...)` decorator at the handler level.

```ts
@Post()
@HttpCode(201)
create() {
  return 'This action adds a new cat';
}
```

### Request payloads

We need to define the DTO (_Data Transfer Object_) schema. A DTO is an object that specifies how data should be sent over the network. The `@Body()` decorator in NestJS is used to extract the body property from the incoming HTTP request object within a controller's route handler.

DTO

```ts
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```

It has only three basic properties. Thereafter we can use the newly created DTO inside the `CatsController`:

```ts
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
```

### Query parameters

When handling query parameters in your routes, you can use the `@Query()` decorator to extract them from incoming requests. Let's see how this works in practice.

Consider a route where we want to filter a list of cats based on query parameters like `age` and `breed`. First, define the query parameters in the `CatsController`:

`GET /cats?age=2&breed=Persian`

```ts
@Get()
async findAll(@Query('age') age: number, @Query('breed') breed: string) {
  return `This action returns all cats filtered by age: ${age} and breed: ${breed}`;
}
```

## Providers

Providers are a core concept in Nest. Many of the basic Nest classes, such as services, repositories, factories, and helpers, can be treated as providers. The key idea behind a provider is that it can be injected as a dependency, allowing objects to form various relationships with each other. The responsibility of "wiring up" these objects is largely handled by the Nest runtime system.

### Services

Let's begin by creating a simple `CatsService`. This service will handle data storage and retrieval, and it will be used by the `CatsController`. Because of its role in managing the application's logic, it’s an ideal candidate to be defined as a provider.

```ts
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';


export interface Cat {
  name: string;
  age: number;
  breed: string;
}

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
```

### Dependency injection

Nest is built around the powerful design pattern known as Dependency Injection. We highly recommend reading a great article about this concept in the official [Angular documentation](https://angular.dev/guide/di).
In Nest, thanks to TypeScript's capabilities, managing dependencies is straightforward because they are resolved based on their type. In the example below, Nest will resolve the `catsService` by creating and returning an instance of `CatsService` (or, in the case of a singleton, returning the existing instance if it has already been requested elsewhere). This dependency is then injected into your _controller's constructor_:

1. In `cats.service.ts`, the `@Injectable()` decorator declares the `CatsService` class as a class that can be managed by the Nest IoC container.
2. In `cats.controller.ts`, `CatsController` declares a dependency on the `CatsService` token with constructor injection:
`constructor(private catsService: CatsService) {}`
3. In `app.module.ts`, we associate the token `CatsService` with the class `CatsService` from the `cats.service.ts` file.

### Provider registration

Now that we've defined a provider (`CatsService`) and a consumer (`CatsController`), we need to register the service with Nest so that it can handle the injection. This is done by editing the module file (`app.module.ts`) and adding the service to the `providers` array in the `@Module()` decorator.

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
```

## Modules

A module is a class that is annotated with the `@Module()` decorator. This decorator provides metadata that Nest uses to organize and manage the application structure efficiently.
Every Nest application has at least one module, the **root** module, which serves as the starting point for Nest to build the application graph.
Modules are highly recommended as an effective way to organize your components.
The `@Module()` decorator takes a single object with properties that describe the module:

| Properties | Description |
| :--------- | :---------- |
| `providers` | The providers that will be instantiated by the Nest injector and that may be shared at least across this module |
| `controllers` | The set of controllers defined in this module which have to be instantiated |
| `imports` | The list of imported modules that export the providers which are required in this module |
| `exports` | The subset of providers that are provided by this module and should be available in other modules which import this module. You can use either the provider itself or just its token (provide value) |

### Feature modules

In our example, the CatsController and CatsService are closely related and serve the same application domain. It makes sense to group them into a feature module.

we'll create the `CatsModule` to demonstrate how to group the controller and service.

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
```

### Shared modules

In Nest, modules are singletons by default, and thus you can share the same instance of any provider between multiple modules effortlessly.
Every module is automatically a **shared module**. Once created it can be reused by any module. Let's imagine that we want to share an instance of the `CatsService` between several other modules. In order to do that, we first need to export the `CatsService` provider by adding it to the module's `exports` array, as shown below:

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService] // exports
})
export class CatsModule {}
```

Now any module that imports the `CatsModule` has access to the `CatsService` and will share the same instance with all other modules that import it as well.

### Global modules

The `@Global()` decorator makes the module global-scoped. Global modules should be registered only once, generally by the root or core module. In the above example, the `CatsService` provider will be ubiquitous, and modules that wish to inject the service will not need to import the `CatsModule` in their imports array.
