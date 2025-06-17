import buildServer from "../main/server";
import { describe, it, expect, afterAll } from '@jest/globals';
import { FastifyInstance } from "fastify";

const fastify: FastifyInstance = buildServer();

const assertPassedValidationResponse = (userInformation: any, response) => {
    expect(response.statusCode).toBe(200);

    const expectedResponse = {
        message: 'User created successfully',
        assignedId: expect.any(Number),
        userInformation
    };

    expect(response.json()).toEqual(expectedResponse);
};

const assertFailedValidationResponse = (response) => {
    expect(response.statusCode).toBe(400);
    expect(response.json()).toEqual({
        statusCode: 400,
        error: 'Bad Request',
        code: "FST_ERR_VALIDATION",
        message: expect.any(String)
    });
}

beforeAll(async () => {
    fastify.decorate('test__mockDatabase', true);
});

afterAll(async () => {
    await fastify.close();
});

describe('User API', () => {
    it('should pass user information data validation, without skills', async () => {
        const userInformation = {
            firstName: 'Francesco',
            lastName: 'Velluto',
            age: 25
        };

        const response = await fastify.inject({
            method: 'POST',
            url: '/api/user',
            payload: userInformation
        });

        assertPassedValidationResponse(userInformation, response);
    });

    it('should pass user information data validation, including skills', async () => {
        const userInformation = {
            firstName: 'Francesco',
            lastName: 'Velluto',
            age: 25,
            skills: ['Java', 'JavaScript']
        };

        const response = await fastify.inject({
            method: 'POST',
            url: '/api/user',
            payload: userInformation
        });

        assertPassedValidationResponse(userInformation, response);
    });

    it('should fail user information data validation because of missing firstName', async () => {
        const userInformation = {
            lastName: 'Velluto',
            age: 25
        };

        const response = await fastify.inject({
            method: 'POST',
            url: '/api/user',
            payload: userInformation
        });

        assertFailedValidationResponse(response);
    });

    it('should fail validation when lastName is missing', async () => {
        const userInformation = {
            firstName: 'Francesco',
            age: 25
        };

        const response = await fastify.inject({
            method: 'POST',
            url: '/api/user',
            payload: userInformation
        });

        assertFailedValidationResponse(response);
    });

    it('should fail validation when age is missing', async () => {
        const userInformation = {
            firstName: 'Francesco',
            lastName: 'Velluto'
        };

        const response = await fastify.inject({
            method: 'POST',
            url: '/api/user',
            payload: userInformation
        });

        assertFailedValidationResponse(response);
    });

    it('should fail validation when age is not a number', async () => {
        const userInformation = {
            firstName: 'Francesco',
            lastName: 'Velluto',
            age: 'twenty-five'
        };

        const response = await fastify.inject({
            method: 'POST',
            url: '/api/user',
            payload: userInformation
        });

        assertFailedValidationResponse(response);
    });

    it('should fail validation when skills is not an array', async () => {
        const userInformation = {
            firstName: 'Francesco',
            lastName: 'Velluto',
            age: 25,
            skills: 'JavaScript'
        };

        const response = await fastify.inject({
            method: 'POST',
            url: '/api/user',
            payload: userInformation
        });

        assertFailedValidationResponse(response);
    });

    it('should fail validation when skills contains non-string values', async () => {
        const userInformation = {
            firstName: 'Francesco',
            lastName: 'Velluto',
            age: 25,
            skills: ['JavaScript', 123]
        };

        const response = await fastify.inject({
            method: 'POST',
            url: '/api/user',
            payload: userInformation
        });

        assertFailedValidationResponse(response);
    });

    it('should fail validation when extra unexpected property is present', async () => {
        const userInformation = {
            firstName: 'Francesco',
            lastName: 'Velluto',
            age: 25,
            nickname: 'Frank'
        };

        const response = await fastify.inject({
            method: 'POST',
            url: '/api/user',
            payload: userInformation
        });

        assertFailedValidationResponse(response);
    });

    it('should fail validation when firstName is empty string', async () => {
        const userInformation = {
            firstName: '',
            lastName: 'Velluto',
            age: 25
        };

        const response = await fastify.inject({
            method: 'POST',
            url: '/api/user',
            payload: userInformation
        });

        assertFailedValidationResponse(response);
    });

    it('should fail validation when age is negative', async () => {
        const userInformation = {
            firstName: 'Francesco',
            lastName: 'Velluto',
            age: -5
        };

        const response = await fastify.inject({
            method: 'POST',
            url: '/api/user',
            payload: userInformation
        });

        assertFailedValidationResponse(response);
    });
});