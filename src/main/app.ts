import { FastifyInstance } from "fastify";
import buildServer from "./server";

const PORT = 3000;
const startServer = async() => {
    const fastify: FastifyInstance = buildServer({ logger: true });

    try {
        const address: string = await fastify.listen({ port: PORT, host: '0.0.0.0' });
        fastify.log.info(`Server listening at ${address}:${PORT}`);
        await fastify.ready();
        fastify.swagger();
    } catch(error) {
        fastify.log.error(error, "Error while starting server");
    }
}

startServer();