import metricsPlugin from 'fastify-metrics';
import fastifyPlugin from 'fastify-plugin';

async function fastifyMetricsPlugin(fastify, options) {
    if (!fastify.test__mockMetrics) {
        fastify.register(metricsPlugin, {
            endpoint: '/metrics',
            defaultLabels: {
                service: 'fastify-app-poc'
            }
        });
    }
}

export default fastifyPlugin(fastifyMetricsPlugin);