import { FastifyInstance } from "fastify";
import { postUserHandler } from "../../handlers/api/user.handler";
import { UserRequestDTO, UserResponseDTO } from "../../dtos/api/user.dto";

async function userRoutes(fastify: FastifyInstance, options: Object) {
    fastify.route({
        method: 'POST',
        url: '/user',
        schema: {
            body: UserRequestDTO,
            response: {
                200: UserResponseDTO
            }
        },
        handler: postUserHandler
    })
}

export default userRoutes;