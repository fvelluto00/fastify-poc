import buildServer from "../main/server";
import { describe, it, expect, afterAll } from '@jest/globals';
import { FastifyInstance } from "fastify";

const fastify: FastifyInstance = buildServer();

const assertLoginSuccessResponse = (response) => {
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
        token: expect.any(String)
    });
};

const assertLoginErrorResponse = (response) => {
    expect(response.statusCode).toBe(401);
    expect(response.json()).toEqual({
        error: "Invalid credentials"
    });
};

beforeAll(async () => {
    fastify.decorate('test__mockDatabase', true);
    fastify.decorate('test__mockKafka', true);
});

afterAll(async () => {
    await fastify.close();
});

describe('Auth API', () => {
    it('should login successfully with valid credentials', async () => {
        const credentials = {
            username: 'admin',
            password: 'password'
        };

        const response = await fastify.inject({
            method: 'POST',
            url: '/api/login',
            payload: credentials
        });

        assertLoginSuccessResponse(response);
    });

    it('should fail to login with invalid credentials', async () => {
        const credentials = {
            username: 'admin',
            password: 'wrongpassword'
        };

        const response = await fastify.inject({
            method: 'POST',
            url: '/api/login',
            payload: credentials
        });

        assertLoginErrorResponse(response);
    });

    it('should return user information for authenticated user', async () => {
        // First, login to get a token
        const loginResponse = await fastify.inject({
            method: 'POST',
            url: '/api/login',
            payload: { username: 'admin', password: 'password' }
        });

        const token = loginResponse.json().token;

        // Now, use the token to get user information
        const response = await fastify.inject({
            method: 'GET',
            url: '/api/me',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual({
            username: 'admin'
        });
    });

    it('should return 401 for unauthenticated user when accessing /me', async () => {
        const response = await fastify.inject({
            method: 'GET',
            url: '/api/me'
        });

        expect(response.statusCode).toBe(401);
        expect(response.json()).toEqual({
            error: "You are not authenticated"
        });
    });
});