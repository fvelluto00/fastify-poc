import { FastifyInstance } from "fastify";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyPlugin from "fastify-plugin";

async function fastifySwaggerUiPlugin(fastify: FastifyInstance) {
    fastify.register(fastifySwaggerUi, {
        routePrefix: '/swagger-ui',
        uiConfig: {
            docExpansion: 'none',
            deepLinking: false
        },
        staticCSP: true,
    });
}

export default fastifyPlugin(fastifySwaggerUiPlugin);