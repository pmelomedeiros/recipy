import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';
import { ValidationExceptionFilter } from '../src/common/filters/validation-exception.filter';
import { AllExceptionsFilter } from '../src/common/filters/all-exceptions.filter';

describe('Recipy API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    // Configure the same validation and filters as main.ts
    app.useGlobalFilters(
      new ValidationExceptionFilter(),
      new HttpExceptionFilter(),
      new AllExceptionsFilter(),
    );
    
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        errorHttpStatusCode: 400,
      }),
    );
    
    app.setGlobalPrefix('api');
    await app.init();
  });

  describe('API Health', () => {
    it('/api/users (GET) - should return paginated users', () => {
      return request(app.getHttpServer())
        .get('/api/users')
        .expect(200);
    });

    it('/api/ingredients (GET) - should return paginated ingredients', () => {
      return request(app.getHttpServer())
        .get('/api/ingredients')
        .expect(200);
    });

    it('/api/categories (GET) - should return paginated categories', () => {
      return request(app.getHttpServer())
        .get('/api/categories')
        .expect(200);
    });

    it('/api/recipes (GET) - should return paginated recipes', () => {
      return request(app.getHttpServer())
        .get('/api/recipes')
        .expect(200);
    });
  });

  describe('Validation', () => {
    it('/api/users (POST) - should reject invalid email', () => {
      return request(app.getHttpServer())
        .post('/api/users')
        .send({
          email: 'invalid-email',
          name: 'John Doe',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.success).toBe(false);
          expect(res.body.message).toContain('Email must be a valid email address');
        });
    });

    it('/api/users (POST) - should reject short name', () => {
      return request(app.getHttpServer())
        .post('/api/users')
        .send({
          email: 'test@example.com',
          name: 'A',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.success).toBe(false);
          expect(res.body.message).toContain('Name must be between 2 and 50 characters');
        });
    });

    it('/api/ingredients (POST) - should reject empty name', () => {
      return request(app.getHttpServer())
        .post('/api/ingredients')
        .send({
          name: '',
          description: 'test',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.success).toBe(false);
          expect(res.body.message).toContain('Name is required');
        });
    });

    it('/api/users (POST) - should reject unauthorized properties', () => {
      return request(app.getHttpServer())
        .post('/api/users')
        .send({
          email: 'test@example.com',
          name: 'John Doe',
          unauthorizedProperty: 'test',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.success).toBe(false);
          expect(res.body.message).toContain('property unauthorizedProperty should not exist');
        });
    });
  });

  describe('Error Handling', () => {
    it('/api/users/:id (GET) - should return 404 for non-existent user', () => {
      return request(app.getHttpServer())
        .get('/api/users/non-existent-id')
        .expect(404)
        .expect((res) => {
          expect(res.body.success).toBe(false);
          expect(res.body.statusCode).toBe(404);
          expect(res.body.message).toBe('User not found');
        });
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
