# Recipy

A recipe management application.

## Project Overview

Recipy is a recipe management platform that allows users to create, manage, and organize recipes with ingredients and categories. Built with a full-stack TypeScript architecture and using a monorepo approach.

## 🚀 Quick Start (Local Development)

### Prerequisites

- **Node.js** 18+
- **Docker** and **Docker Compose**
- **npm** (comes with Node.js)

### 1. Clone and Install Dependencies

```bash
git clone git@github.com:pmelomedeiros/recipy.git
cd recipy
npm install
```

### 2. Start the Database

First, make sure Docker is running.

Start PostgreSQL using Docker Compose:

```bash
docker-compose up -d
```

This will start PostgreSQL on `localhost:5432` with:

- Database: `recipy`
- Username: `postgres`
- Password: `postgres`

### 3. Set Up Environment Variables

Create environment files for the backend:

```bash
# apps/backend/.env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/recipy?schema=public"
API_PORT=3000
```

Create environment file for the frontend (only if using different port):

```bash
# apps/frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

> **Note**: Skip this if the backend uses the default port 3000 - the frontend will automatically connect to `http://localhost:3000/api`.

### 4. Initialize the Database

Generate Prisma client and push schema to database:

```bash
# Generate Prisma client
cd apps/backend
npm run db:generate

# Push database schema
npm run db:push

# Optional: Seed the database with sample data
npx ts-node prisma/seed.ts

# Return to root directory
cd ../..
```

### 5. Start Development Servers

Start both backend and frontend:

```bash
npm run dev
```

Or start them individually:

```bash
# Backend only (NestJS API)
npm run dev --filter=backend

# Frontend only (Next.js app)
npm run dev --filter=frontend
```

### 6. Access the Application

- **Frontend**: <http://localhost:3001> (Next.js web app)
- **Backend API**: <http://localhost:3000/api> (NestJS API server)
- **Database**: `localhost:5432` (PostgreSQL - not directly accessible via browser)

## 📁 Project Structure

### Apps and Packages

- `apps/backend`: A [NestJS](https://nestjs.com/) API server with PostgreSQL database
- `apps/frontend`: A [Next.js](https://nextjs.org/) web application

### Tech Stack

- **Backend**: NestJS, Prisma ORM, PostgreSQL, TypeScript
- **Frontend**: Next.js 15, React 19, Tailwind CSS v4, TypeScript
- **Database**: PostgreSQL (via Docker)
- **Development**: Turborepo, ESLint, Prettier

## 🛠️ Development Commands

### Database Commands

```bash
# Generate Prisma client after schema changes
npm run db:generate

# Push schema changes to database (development)
npm run db:push

# Run database migrations (production)
npm run db:migrate

# Open Prisma Studio (database GUI)
npx prisma studio --schema=apps/backend/prisma/schema.prisma

# Reset database (⚠️ destructive)
npx prisma db push --force-reset --schema=apps/backend/prisma/schema.prisma
```

### Build Commands

Build all apps and packages:

```bash
npm run build
```

Build specific apps:

```bash
# Build backend only
npm run build --filter=backend

# Build frontend only
npm run build --filter=frontend
```

### Code Quality

```bash
# Run linting
npm run lint

# Run type checking
npm run check-types

# Format code
npm run format
```

### Testing

```bash
# Run all tests
npm test

# Run backend tests
npm test --filter=backend

# Run tests in watch mode
npm run test:watch --filter=backend

# Run e2e tests
npm run test:e2e --filter=backend
```

## 🔧 Troubleshooting

### Database Issues

If you encounter database connection issues:

```bash
# Check if PostgreSQL container is running
docker-compose ps

# Restart database container
docker-compose restart postgres

# Check database logs
docker-compose logs postgres

# Reset database if needed
docker-compose down -v && docker-compose up -d
```

### Port Conflicts

If ports are already in use:

- **Port 3000**: Backend API - change `API_PORT` in `apps/backend/.env`
- **Port 3001**: Frontend - Next.js will automatically use next available port
- **Port 5432**: PostgreSQL - change port mapping in `docker-compose.yml`

### Clear Node Modules

If you encounter dependency issues:

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Or clean all workspaces
npx turbo clean
npm install
```

## 📚 API Documentation

### Backend API Endpoints

The NestJS backend provides the following API endpoints:

- **GET** `/api/recipes` - Get all recipes
- **GET** `/api/recipes/:id` - Get recipe by ID
- **POST** `/api/recipes` - Create new recipe
- **PUT** `/api/recipes/:id` - Update recipe
- **DELETE** `/api/recipes/:id` - Delete recipe

- **GET** `/api/users` - Get all users
- **GET** `/api/users/:id` - Get user by ID
- **POST** `/api/users` - Create new user

- **GET** `/api/ingredients` - Get all ingredients
- **POST** `/api/ingredients` - Create new ingredient

- **GET** `/api/categories` - Get all categories
- **POST** `/api/categories` - Create new category

### Frontend Routes

- `/` - Homepage with navigation to recipes
- `/recipes` - Browse all recipes in card format

## 🎯 Features

- ✅ **Recipe Management**: Create, read, update, delete recipes
- ✅ **User System**: User accounts and recipe ownership
- ✅ **Ingredients**: Track recipe ingredients with quantities
- ✅ **Categories**: Organize recipes by categories
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **Type Safety**: Full TypeScript support across frontend and backend
- ✅ **Modern Stack**: Next.js 15, React 19, NestJS, Prisma, PostgreSQL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Run linting (`npm run lint`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Useful Links

Learn more about the technologies used in this project:

- [Turborepo Documentation](https://turborepo.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://nestjs.com/)
- [Prisma Documentation](https://prisma.io/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
