import { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifyPlugin from "fastify-plugin";

async function fastifySwaggerPlugin(fastify: FastifyInstance) {
    fastify.register(fastifySwagger, {
        openapi: {
            openapi: '3.0.0',
            info: {
                title: 'Fastify PoC API Documentation',
                version: '1.0.0',
                description: 'API documentation for the Fastify Proof of Concept application.'
            },
            servers: [
                { url: 'http://localhost:3000' }
            ]
        },
    });
}

export default fastifyPlugin(fastifySwaggerPlugin);