import { Static, Type } from "@sinclair/typebox";

export const KafkaPostMessageRequestDTO = Type.Object({
    message: Type.String({
        description: "The message to be sent to the Kafka topic",
        minLength: 1
    })
}, { additionalProperties: false });

export type KafkaPostMessageRequestDTOType = Static<typeof KafkaPostMessageRequestDTO>;

export const KafkaPostMessageSuccessResponseDTO = Type.Object({
    message: Type.String({
        description: "Confirmation message after sending to Kafka"
    })
}, { additionalProperties: false });

export type KafkaPostMessageResponseDTOType = Static<typeof KafkaPostMessageSuccessResponseDTO>;

export const KafkaPostMessageErrorResponseDTO = Type.Object({
    message: Type.String({
        description: "Error message if sending to Kafka fails"
    })
}, { additionalProperties: false });

export type KafkaPostMessageErrorResponseDTOType = Static<typeof KafkaPostMessageErrorResponseDTO>;