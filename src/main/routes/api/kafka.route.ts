import fastifyKafka from '@fastify/kafka';

async function kafkaRoutes(fastify) {
    if (!fastify.test__mockKafka) {
        fastify.register(async (fastify, opts, done) => {
            await fastify.register(fastifyKafka, {
                producer: {
                    "bootstrap.servers": "kafka:9092",
                    "client.id": "fastify-poc-producer"
                },
                consumer: {
                    "bootstrap.servers": "kafka:9092",
                    "group.id": "fastify-poc-consumer"
                }
            });

            fastify.route({
                method: 'POST',
                url: '/kafka',
                handler: (request, reply) => {
                    const messageId = Date.now().toString();

                    fastify.kafka.push({
                        topic: 'test-fastify-poc-topic',
                        payload: [{
                            message: 'test'
                        }],
                        key: messageId,
                        partition: 0
                    });

                    reply.send({ messageId });
                }
            });

            done();
        });
    }
}

export default kafkaRoutes;
