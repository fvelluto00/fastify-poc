import { Type, Static } from "@sinclair/typebox";

export const LoginRequestDTO = Type.Object({
    username: Type.String({
        description: "The username of the user",
        minLength: 1
    }),
    password: Type.String({
        description: "The password of the user",
        minLength: 6
    })
}, { additionalProperties: false });

export type LoginRequestDTOType = Static<typeof LoginRequestDTO>;

export const LoginSuccessResponseDTO = Type.Object({
    token: Type.String({
        description: "JWT token",
        minLength: 1
    })
}, { additionalProperties: false });

export type LoginResponseDTOType = Static<typeof LoginSuccessResponseDTO>;

export const LoginErrorResponseDTO = Type.Object({
    error: Type.String({
        description: "Error message"
    })
}, { additionalProperties: false });

export type LoginErrorResponseDTOType = Static<typeof LoginErrorResponseDTO>;

export const MeSuccessResponseDTO = Type.Object({
    username: Type.String({
        description: "The username of the authenticated user",
        minLength: 1
    })
}, { additionalProperties: false });

export type MeSuccessResponseDTOType = Static<typeof MeSuccessResponseDTO>;

export const NotAuthenticatedErrorResponseDTO = Type.Object({
    error: Type.String({
        description: "Error message indicating the user is not authenticated"
    })
}, { additionalProperties: false });

export type NotAuthenticatedErrorResponseDTOType = Static<typeof NotAuthenticatedErrorResponseDTO>;
