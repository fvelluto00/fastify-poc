import { FastifyInstance } from "fastify";
import helloWorldRoutes from "./api/helloworld.route";
import userRoutes from "./api/user.route";

async function apiRoutes(fastify: FastifyInstance, options: Object) {
    fastify.register(helloWorldRoutes, { prefix: '/api' });
    fastify.register(userRoutes, { prefix: '/api' });
}

export default apiRoutes;