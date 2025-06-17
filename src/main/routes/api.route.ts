import { FastifyInstance } from "fastify";
import helloWorldRoutes from "./api/helloworld.route";
import userRoutes from "./api/user.route";
import productRoutes from "./api/database/product.route";
import fastifyMongoDBInterface from "../plugins/mongodb.plugin";

async function apiRoutes(fastify: FastifyInstance, options: Object) {
    fastify.register(helloWorldRoutes, { prefix: '/api' });
    fastify.register(userRoutes, { prefix: '/api' });

    // Context of the APIs that need the database interface
    fastify.register((fastify, opts, done) => {
        // Register the MongoDB plugin
        fastify.register(fastifyMongoDBInterface);
        
        // Register the routes
        fastify.register(productRoutes);

        done();
    }, { prefix: '/api/database' });
}

export default apiRoutes;