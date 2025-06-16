import { Type } from "@sinclair/typebox";
import type { Static } from '@sinclair/typebox';

enum UserSkills {
    Java = "Java",
    JavaScript = "JavaScript",
    Cpp = "C++"
};

export const UserRequestDTO = Type.Object({
    firstName: Type.String({
        description: "The first name of the user",
        minLength: 1
    }),
    lastName: Type.String({
        description: "The last name of the user",
        minLength: 1
    }),
    age: Type.Integer({
        description: "The age of the user",
        minimum: 0,
        maximum: 99
    }),
    skills: Type.Optional(
        Type.Array(
            Type.Enum(UserSkills),
            {
                description: "The skills of the user"
            }
        )
    )
}, { additionalProperties: false });

export type UserRequestDTOType = Static<typeof UserRequestDTO>;

export const UserResponseDTO = Type.Object({
    message: Type.String({
        description: "A success message"
    }),
    assignedId: Type.Integer({
        description: "The id assigned to the user"
    }),
    userInformation: UserRequestDTO
}, { additionalProperties: false });

export type UserResponseDTOType = Static<typeof UserResponseDTO>;