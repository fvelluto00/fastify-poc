import Fastify, { FastifyInstance } from "fastify";
import apiRoutes from "./routes/api.route";
import { TypeBoxTypeProvider, TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox'
import fastifyMetricsPlugin from "./plugins/metrics.plugin";
import fastifyOtelInstrumentation from "./plugins/otel.plugin";
import fastifySwaggerPlugin from "./plugins/swagger.plugin";
import fastifySwaggerUiPlugin from "./plugins/swaggerui.plugin";

const buildServer = (options = {}): FastifyInstance => {
    const fastify: FastifyInstance = Fastify(options)
                                        .setValidatorCompiler(TypeBoxValidatorCompiler)
                                        .withTypeProvider<TypeBoxTypeProvider>();

    fastify.register(fastifySwaggerPlugin);
    fastify.register(fastifySwaggerUiPlugin);
    fastify.register(fastifyOtelInstrumentation.plugin());
    
    // Prometheus metrics only without OpenTelemetry
    // fastify.register(fastifyMetricsPlugin);
    
    fastify.register(apiRoutes);
    return fastify;
};

export default buildServer;