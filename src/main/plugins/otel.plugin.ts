import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import {
    PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics';
import { trace } from '@opentelemetry/api';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import FastifyOtel from '@fastify/otel';

let fastifyOtelInstrumentation: FastifyOtel | undefined;

const sdk = new NodeSDK({
    traceExporter: new OTLPTraceExporter({
        url: 'http://otel-collector:4318/v1/traces',
    }),
    metricReader: new PrometheusExporter({
        port: 9464,
        endpoint: '/metrics',
    }),
    instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();

fastifyOtelInstrumentation = new FastifyOtel({
    servername: 'fastify-poc',
});
fastifyOtelInstrumentation.setTracerProvider(trace.getTracerProvider());

export default fastifyOtelInstrumentation;