import { FastifyReply, FastifyRequest } from "fastify";
import { HelloWorldResponseDTOType } from "../../dtos/api/helloworld.dto";

type HelloWorldDTOType = {
    Reply: HelloWorldResponseDTOType
}

export const helloWorldHandler = (
    request: FastifyRequest<HelloWorldDTOType>,
    reply: FastifyReply<HelloWorldDTOType>
) => {
    const response: HelloWorldResponseDTOType = {
        message: "Hello, World!"
    };

    reply.status(200).send(response);
}