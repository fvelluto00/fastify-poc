import Fastify, { FastifyInstance } from "fastify";
import apiRoutes from "./routes/api.route";
import { TypeBoxTypeProvider, TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox'
import fastifyMetricsPlugin from "./plugins/metrics.plugin";

const buildServer = (options = {}): FastifyInstance => {
    const fastify: FastifyInstance = Fastify(options)
                                        .setValidatorCompiler(TypeBoxValidatorCompiler)
                                        .withTypeProvider<TypeBoxTypeProvider>();

    fastify.register(fastifyMetricsPlugin);
    fastify.register(apiRoutes);
    return fastify;
};

export default buildServer;