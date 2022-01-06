# NestJS REST API com Prisma
Por <a href="https://www.linkedin.com/in/chanelym/">Chanely Marques</a> & <a href="https://www.linkedin.com/in/bernardofnoro/">Bernardo Freitas</a>

## Sobre

:dart: Configuração do Prisma com PostgreSQL

:dart: Integração do Prisma com NetsJS

:dart: API REST com CRUD

:dart: Autenticação com JWT

:dart: Manipulação de erros do Prisma utilizando os filtros de exceções do NestJS

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

## NestJS

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

### Configurando o ambiente local

 :smiley_cat: :pencil2: Clone o repositório do seu projeto no GitHub

 :smiley_cat: :pencil2: Acesse a pasta clonada e instale a NestJS CLI

```
npm i -g @nestjs/cli
```

 :smiley_cat: :pencil2: Crie a pasta para o projeto que vamos construir

```bash
nest new twitter
cd twitter
```

> **_Nota_** :bangbang: Caso encontre o erro `Failed to execute command: npm install --silent`, apague a pasta **twitter** e execute a sequência de comandos abaixo:

```bash
npm cache clean --force
npm i -g source-map-resolve
npm i -g @nestjs/cli
nest new twitter
```

 :smiley_cat: :pencil2: Instale e configure o _Swagger_:

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

```javascript
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

![figura_01](misc/images/figura_01.png)

### Criando um banco de dados no Heroku

Caso você não tenha o **PostgreSQL** instalado localmente ou não queira instalá-lo, o _Heroku_ é uma opção para persistirmos dados.

Faça _Login_ na sua conta do **_Heroku_** e clique no botão para a criação de uma nova app:

![figura_10](misc/images/figura_10.png)

Coloque o nome que fizer sentido pra você e clique em **_Create app_**. 

Com nossa _app_ criada, precisamos agora criar o Banco de Dados e fazemos isso clicando no botão de opções e selecionando  **_Data_**:

![figura_07](misc/images/figura_07.png)

Escolha a opção **_Heroku Postgres_**:

![figura_08](misc/images/figura_08.png)

Aperte o botão de **_Install Heroku Postgres_**:

![figura_09](misc/images/figura_09.png)

Adicione o nome de sua _app_ e mantenha o plano **_Hobby Dev - Free_** e clique em **_Submit Order Form_**:

![figura_11](misc/images/figura_11.png)

Com o banco de dados criado, clique em **_Heroku Postgres_**. Na tela seguinte selecione a opção **_Settings_** e em seguida, **_View Credentials_**:

![figura_12](misc/images/figura_12.png)

Usaremos estas informações de credenciais para configurar o arquivo **.env** que auxiliará na conexão com o banco. Falaremos sobre ele daqui a pouco.

![figura_13](misc/images/figura_13.png)

## Configuração do Prisma com PostgreSQL

Agora que colocamos parte do ambiente em ordem e instalamos o que precisamos até aqui, precisamos adicionar o Prisma ao projeto instalando-o como dependência de desenvolvimento, inicializar o _schema_ e instalar a `@prisma/client`.

```bash
npm install prisma --save-dev
npx prisma init --datasource-provider postgresql

npm install @prisma/client
```

Quando utilizamos o parâmetro `init` para o Prisma, estamos criando um diretório chamado **prisma** contendo o arquivo `schema.prisma` que é fundamental para o seu funcionamento:

```javascript
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

```

Além do diretório acima, ` prisma init` também cria o arquivo `.env` que nos auxilia a customizar variáveis de ambiente para usarmos em todo o projeto. Desta forma, podemos ocultar informações sensíveis como usuário e senha.

Seu arquivo deve estar configurado desta forma:

```javascript
DATABASE_URL="postgres://bzcjdnejndbctt:fd220924131b8a284504c3e1333860f1710b027e255fed3ae9bb531ba674ccaf@ec2-18-235-86-66.compute-1.amazonaws.com:5432/dcs315rnonib8o"
```

Onde: DATABASE_URL="postgresql://**NOME_USUARIO**:**SENHA_USUARIO**@**NOME_HOST**:5432/**NOME_DO_BANCO**"

> **_Dica_**: na página de configurações do _Heroku_, uma **URI** completa e correta nos é fornecida. Você pode colocar seu conteúdo entre as aspas no `.env`.

> **_IMPORTANTÍSSIMO_** :bangbang: :bangbang: NUNCA, JAMAIS, EVER deixe seu arquivo `.env` exposto nas internetz. **SEMPRE** cheque se ele está na lista de arquivos do `.gitignore`. Como estamos utilizando este repositório para fins didáticos, abrimos uma exceção.

Precisamos criar um modelo para o nosso banco de dados onde nossas tabelas serão representadas. Como estamos construindo uma API que servirá dados de uma rede social, faremos uma representação para o _Twitter_ como exemplo:

```typescript
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Tweet {
  id            Int                  @id @default(autoincrement())
  content       String               @db.VarChar(140)
  userid        Int
  user          User                 @relation(fields: [userid], references: [id])
  categories    CategoriesOnTweets[]
  favoriteTweet FavoriteTweet[]
  createdAt     DateTime             @default(now()) @map("created_at")
}

model Category {
  id        Int                  @id @default(autoincrement())
  name      String
  tweet     CategoriesOnTweets[]
  createdAt DateTime             @default(now()) @map("created_at")
}

model Follower {
  id        Int      @id @default(autoincrement())
  name      String
  userid    Int
  user      User     @relation(fields: [userid], references: [id])
  createdAt DateTime @default(now()) @map("created_at")
}

model Following {
  id        Int      @id @default(autoincrement())
  name      String
  userid    Int
  user      User     @relation(fields: [userid], references: [id])
  createdAt DateTime @default(now()) @map("created_at")
}

model User {
  id            Int             @id @default(autoincrement())
  name          String
  lastname      String
  username      String          @unique
  password      String
  about         String
  birthday      String
  tweet         Tweet[]
  follower      Follower[]
  following     Following[]
  favoriteTweet FavoriteTweet[]
  createdAt     DateTime        @default(now()) @map("created_at")
}

model CategoriesOnTweets {
  tweet      Tweet    @relation(fields: [tweetid], references: [id])
  tweetid    Int
  category   Category @relation(fields: [categoryid], references: [id])
  categoryid Int
  assignedAt DateTime @default(now())
  assignedBy String

  @@id([tweetid, categoryid])
}

model FavoriteTweet {
  tweetid    Int
  tweet      Tweet    @relation(fields: [tweetid], references: [id])
  userid     Int
  user       User     @relation(fields: [userid], references: [id])
  assignedAt DateTime @default(now())
  assignedBy String

  @@id([tweetid, userid])
}

```

Para um melhor entendimento, podemos visualizar este `schema.prisma` da seguinte forma:

![db_final_diagram](misc/images/db_final_diagram.png)

**Conexões One To Many**: 

- Tabela Tweet

  - **id**: Primary Key

  - **content**: String

  - **categoryid**: Foreign Key

  - **userid**: Foreign Key

  - **created_at**: Data de Criação



- Tabela Category 

  - **id**: Primary Key

  - **name**: String

  - **created_at**: Data de Criação



- Tabela Follower

  - **id**: Primary Key

  - **follower**: String

  - **created_at**: Data de Criação



- Tabela Following

  - **id**: Primary Key

  - **follower**: String

  - **created_at**: Data de Criação



- Tabela User 

  - **id**: Primary Key

  - **name**: String	

  - **lastname**: String

  - **username**: String e não se repete

  - **password**: String

  - **about**: String

  - **birthday**: String

  - **tweetid**: Foreign Key

  - **followerid**: Foreign Key

  - **followingid**: Foreign Key

  - **created_at**: Data de Criação



**Conexões Many To Many**:

- Tabela CategoriesOnTweets

  - **categoryid**: Foreign Key

  - **tweetid**: Foreign Key

  - **assignedAt**: Quando a categoria foi atribuída

  - **created_at**: Data de Criação



- Tabela FavoritesOnUser

  - **userid**: Foreign Key

  - **tweetid**: Foreign Key



Agora que temos nosso modelo criado, vamos sincronizar nosso Prisma _schema_ com o _schema_ do banco de dados utilizando o comando:

```bash
npx prisma db push
```

> :smiley_cat: :pencil2: **_Nota_**: Sugerimos fortemente que você estude a diferença entre **Prisma Migrate** e **db push**, dado que ambas funções são usadas para casos específicos dependendo do ambiente de banco de dados que tenha em mãos.

![figura_02](misc/images/figura_02.png)

Vamos checar se tudo foi criado como deveria? Abra seu **psql** e informe as credenciais de acesso ao banco no _Heroku_:

## REST API



## Manipulação de Erros



## Autenticação

