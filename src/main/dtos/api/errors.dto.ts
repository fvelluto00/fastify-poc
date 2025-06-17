import { Type, Static } from "@sinclair/typebox";

export const NotFoundErrorDTO = Type.Object({
    message: Type.String({
        description: "Error message indicating that the requested resource was not found",
        default: "Not Found"
     })
});

export type NotFoundErrorDTOType = Static<typeof NotFoundErrorDTO>;