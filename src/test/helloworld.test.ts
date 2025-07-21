import buildServer from "../main/server";
import { describe, it, expect } from '@jest/globals';
import { FastifyInstance } from "fastify";

const fastify: FastifyInstance = buildServer();

beforeAll(async () => {
    fastify.decorate('test__mockDatabase', true);
    fastify.decorate('test__mockKafka', true);
});

afterAll(async () => {
    await fastify.close();
});

describe('GET /api/helloworld', () => {
    it('should get hello world message from server', async () => {
        const response = await fastify.inject({
            method: 'GET',
            url: '/api/helloworld'
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual({ message: 'Hello, World!' });
    });
});