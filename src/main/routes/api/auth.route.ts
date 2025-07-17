import { FastifyInstance } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";
import { LoginErrorResponseDTO, LoginRequestDTO, LoginSuccessResponseDTO, MeSuccessResponseDTO, NotAuthenticatedErrorResponseDTOType, NotAuthenticatedErrorResponseDTO } from "../../dtos/api/auth.dto";
import { getMeHandler, postLoginHandler } from "../../handlers/api/auth.handler";

declare module "fastify" {
    interface FastifyInstance {
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}

async function authRoutes(fastify: FastifyInstance, options: Object) {
    fastify.register(fastifyJwt, {
        secret: "my-supersecret"
    });

    fastify.decorate("authenticate", async function (request, reply) {
        try {
            await request.jwtVerify();
        } catch (err) {
            const NotAuthenticatedErrorResponseDTO: NotAuthenticatedErrorResponseDTOType = {
                error: "You are not authenticated"
            };
            reply.status(401).send(NotAuthenticatedErrorResponseDTO);
            return;
        }
    });

    fastify.route({
        method: 'POST',
        url: '/login',
        schema: {
            body: LoginRequestDTO,
            response: {
                200: LoginSuccessResponseDTO,
                401: LoginErrorResponseDTO
            }
        },
        handler: postLoginHandler
    });

    fastify.route({
        method: 'GET',
        url: '/me',
        schema: {
            response: {
                200: MeSuccessResponseDTO,
                401: NotAuthenticatedErrorResponseDTO
            }
        },
        preHandler: fastify.authenticate,
        handler: getMeHandler
    });
}

export default authRoutes;