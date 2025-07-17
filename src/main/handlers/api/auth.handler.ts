import { FastifyReply, FastifyRequest } from "fastify";
import { LoginErrorResponseDTOType, LoginRequestDTOType, LoginResponseDTOType, MeSuccessResponseDTOType, NotAuthenticatedErrorResponseDTOType } from "../../dtos/api/auth.dto";

type PostLoginDTOType = {
    Body: LoginRequestDTOType;
    Reply: {
        200: LoginResponseDTOType;
        401: LoginErrorResponseDTOType;
    }
};

export const postLoginHandler = (
    request: FastifyRequest<PostLoginDTOType>,
    reply: FastifyReply<PostLoginDTOType>
) => {
    const credentials: LoginRequestDTOType = request.body;

    // Mock credentials validation
    if (credentials.username === "admin" && credentials.password === "password") {
        const token = request.server.jwt.sign({ username: credentials.username });
        reply.status(200).send({ token });
    } else {
        reply.status(401).send({ error: "Invalid credentials" });
    }
};

type MeDTOType = {
    Reply: {
        200: MeSuccessResponseDTOType;
        401: NotAuthenticatedErrorResponseDTOType;
    }
};

export const getMeHandler = (
    request: FastifyRequest<MeDTOType>,
    reply: FastifyReply<MeDTOType>
) => {
    const user = request.user;

    if (user && typeof user === "object" && "username" in user && typeof user.username === "string") {
        reply.status(200).send({ username: user.username });
    } else {
        reply.status(401).send({ error: "You are not authenticated" });
    }
};