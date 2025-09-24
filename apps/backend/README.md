# Recipy Backend

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository with PostgreSQL database using Prisma ORM.

## Prerequisites

- Node.js (v18+ recommended)
- Docker and Docker Compose
- npm or yarn

## Database Setup

### 1. Start PostgreSQL with Docker

From the project root directory, start the PostgreSQL database:

```bash
docker-compose up -d
```

This will start a PostgreSQL container with:

- Host: `localhost`
- Port: `5432`
- Database: `recipy`
- Username: `postgres`
- Password: `postgres`

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

The `.env` file should contain:

```properties
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/recipy?schema=public"
```

### 3. Generate Prisma Client and Run Migrations

```bash
npm run db:generate
npm run db:push
```

### 4. (Optional) Open Prisma Studio

To view and edit your database:

```bash
npm run db:studio
```

## Project setup

```bash
npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode (recommended for development)
$ npm run dev

# production mode
$ npm run start:prod
```

## Database Commands

```bash
# Generate Prisma client
$ npm run db:generate

# Push schema changes to database (for development)
$ npm run db:push

# Create and run migrations (for production)
$ npm run db:migrate

# Open Prisma Studio (database GUI)
$ npm run db:studio
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stopping the Database

To stop the PostgreSQL container:

```bash
docker-compose down
```

To stop and remove volumes (⚠️ this will delete all data):

```bash
docker-compose down -v
```
