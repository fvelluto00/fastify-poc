import { FastifyInstance } from "fastify";
import { helloWorldHandler } from "../../handlers/api/helloworld.handler";
import { HelloWorldResponseDTO } from "../../dtos/api/helloworld.dto";

async function helloWorldRoutes(fastify: FastifyInstance, options: Object) {
    fastify.route({
        method: 'GET',
        url: '/helloworld',
        schema: {
            response: {
                200: HelloWorldResponseDTO
            }
        },
        handler: helloWorldHandler
    })
}

export default helloWorldRoutes;