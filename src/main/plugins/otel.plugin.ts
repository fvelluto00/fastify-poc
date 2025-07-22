import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { trace } from '@opentelemetry/api';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { FastifyOtelInstrumentation } from '@fastify/otel';
import { resourceFromAttributes } from '@opentelemetry/resources';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';

let fastifyOtelInstrumentation: FastifyOtelInstrumentation | undefined;

const sdk = new NodeSDK({
    traceExporter: new OTLPTraceExporter({
        url: 'http://otel-collector:4318/v1/traces',
    }),
    metricReader: new PrometheusExporter({
        port: 9464,
        endpoint: '/metrics',
    }),
    resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: 'fastify-poc-app',
        [ATTR_SERVICE_VERSION]: '1.0',
    }),
    instrumentations: [getNodeAutoInstrumentations()]
});
sdk.start();

fastifyOtelInstrumentation = new FastifyOtelInstrumentation({
    servername: 'fastify-poc-app'
});
fastifyOtelInstrumentation.setTracerProvider(trace.getTracerProvider());

export default fastifyOtelInstrumentation;