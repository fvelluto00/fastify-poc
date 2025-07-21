import { FastifyReply, FastifyRequest } from "fastify";
import { KafkaPostMessageErrorResponseDTOType, KafkaPostMessageRequestDTOType, KafkaPostMessageResponseDTOType } from "../../dtos/api/kafka.dto";

// Extend FastifyRequest to include kafka property
declare module "fastify" {
    interface FastifyRequest {
        kafka: {
            producer: () => {
                connect: () => Promise<void>;
                send: (params: { topic: string; messages: { value: string }[] }) => Promise<void>;
                disconnect: () => Promise<void>;
            };
        };
    }
}

type PostKafkaDTOType = {
    Body: KafkaPostMessageRequestDTOType,
    Reply: {
        200: KafkaPostMessageResponseDTOType,
        500: KafkaPostMessageErrorResponseDTOType
    };
}

export const postKafkaHandler = async (
    request: FastifyRequest<PostKafkaDTOType>,
    reply: FastifyReply<PostKafkaDTOType>
) => {
    const { message } = request.body;
    const producer = request.kafka.producer();

    try {
        await producer.connect();
        await producer.send({
            topic: 'test-fastify-poc-topic',
            messages: [{ value: message }],
        });
        await producer.disconnect();

        const response: KafkaPostMessageResponseDTOType = {
            message: "Message sent to Kafka successfully"
        };

        reply.status(200).send(response);
    } catch (error) {
        console.error("Error sending message to Kafka:", error);
        reply.status(500).send({ message: "Failed to send message to Kafka" });
    }
};