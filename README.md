# NestJS REST API com Prisma
Por <a href="https://www.linkedin.com/in/chanelym/">Chanely Marques</a> & <a href="https://www.linkedin.com/in/bernardofnoro/">Bernardo Freitas</a>

## Sobre

:ballot_box_with_check: Configuração do Prisma com PostgreSQL

:ballot_box_with_check: Integração do Prisma com NetsJS

:ballot_box_with_check: API REST com CRUD

:ballot_box_with_check: Autenticação com JWT

:ballot_box_with_check: Manipulação de erros do Prisma utilizando os filtros de exceções do NestJS

## Nossas Ferramentas

:wrench: **Node.js** - LTS Version: **16.13.1**

[Download](https://nodejs.org/en/download/)

[Documentação](https://nodejs.org/en/docs/)

:wrench: **NestJS** - Version: 8.2.4

[Documentação](https://docs.nestjs.com/)

:wrench: **Prisma**

[Documentação](https://www.prisma.io/docs/)

:wrench: **PostgreSQL** - Version **14.1**

[Download](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

[Documentação](https://www.postgresql.org/docs/14/release-14.html)

## 01. NestJS

O NestJS é um framework utilizado na construção de aplicações _server-side_ em Node.js de forma eficiente e escalável, podendo utilizar o Express ou Fastify como servidores HTTP.

O NestJS nos permite construir APIs REST ou GraphQL.

Sua arquitetura é muito inspirada na do Angular, contendo:

- **Módulos** que organizam e delimitam, eles agrupam os controladores (**_controllers_**), resolvedores (**_resolvers_**) e os serviços (**_services_**). 

  ```bash
  nest generate module
  ```

- **Controllers** que são utilizados para configuração dos nossos _endpoints_. 

  ```bash
  nest generate controller
  ```

- **Resolvers** para definir as _queries_ do GraphQL

  ```bash
  nest generate resolver
  ```

- **Services** que implementam e isolam a lógica de negócio

  ```bash
  nest generate service
  ```

### Configurando o ambiente

:ballot_box_with_check: Clone o repositório do seu projeto no GitHub

:ballot_box_with_check: Acesse a pasta clonada e instale a NestJS CLI

```
npm i -g @nestjs/cli
```

:ballot_box_with_check: Crie a pasta para o projeto que vamos construir

```bash
nest new twitter
cd twitter
```

:bangbang: Caso encontre o erro `Failed to execute command: npm install --silent`, apague a pasta **twitter** e execute a sequência de comandos abaixo:

```bash
npm cache clean --force
npm i -g source-map-resolve
npm i -g @nestjs/cli
nest new twitter
```

:ballot_box_with_check: Instale e configure o _Swagger_:

```bash
npm i @nestjs/swagger class-transformer class-validator swagger-ui-express
```

Após a instalação acesse o arquivo `main.ts` para configurar o _swagger_:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Twitter API')
    .setDescription('Serve Tweets Data')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/doc', app, document); // aqui defino o endereço do swagger

  await app.listen(3000);
}
bootstrap();

```

Vamos aproveitar para fazer alguns ajustes no arquivo `.eslintrc.js`:

```json
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'twitter/tsconfig.json', // correcting path
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  exclude: [
    'node_modules',
    'test',
    'dist',
    '**/*spec.ts',
    'tweets.ts', // exclude seed file
    'prisma', // exclude prisma directory
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};


```

Podemos iniciar nossa API com o comando `npm run start:dev` para testar o _swagger_ executando em:

- `localhost:3000/api/v1/doc`

![figura_01](twitter/misc/images/figura_01.png)

## 02. Configuração do Prisma com PostgreSQL



## 03. REST API



## 04. Manipulação de Erros



## 05. Autenticação

