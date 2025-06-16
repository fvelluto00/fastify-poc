import { FastifyReply, FastifyRequest } from "fastify";
import { UserRequestDTOType, UserResponseDTOType } from "../../dtos/api/user.dto";

type PostUserDTOType = {
    Body: UserRequestDTOType;
    Reply: UserResponseDTOType;
}

export const postUserHandler = (
    request: FastifyRequest<PostUserDTOType>,
    reply: FastifyReply<PostUserDTOType>
) => {
    const userInformation: UserRequestDTOType = request.body;

    const assignedId: number = Math.floor(Math.random() * 1000);
    const response: UserResponseDTOType = {
        message: "User created successfully",
        assignedId: assignedId,
        userInformation: userInformation
    };

    reply.status(200).send(response);
}