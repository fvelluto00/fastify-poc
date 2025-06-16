import { Type, Static } from "@sinclair/typebox";

export const HelloWorldResponseDTO = Type.Object({
    message: Type.String({
        description: "A greeting message",
        default: "Hello, World!"
    })
}, { additionalProperties: false });

export type HelloWorldResponseDTOType = Static<typeof HelloWorldResponseDTO>;
