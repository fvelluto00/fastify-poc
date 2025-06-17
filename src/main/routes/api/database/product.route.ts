import { FastifyInstance } from "fastify";
import { GetProductByIdResponseDTO, CreateProductRequestDTO, CreateProductResponseDTO, GetProductByIdParamsDTO } from "../../../dtos/api/database/product.dto";
import { createProductHandler, getProductByIdHandler } from "../../../handlers/api/database/product.handler";
import { NotFoundErrorDTO } from "../../../dtos/api/errors.dto";

function productRoutes(fastify: FastifyInstance, _options: Object) {
    fastify.route({
        method: 'GET',
        url: '/product/:productId',
        schema: {
            params: GetProductByIdParamsDTO,
            response: {
                200: GetProductByIdResponseDTO,
                404: NotFoundErrorDTO
            }
        },
        handler: getProductByIdHandler
    });

    fastify.route({
        method: 'POST',
        url: '/product',
        schema: {
            body: CreateProductRequestDTO,
            response: {
                201: CreateProductResponseDTO
            }
        },
        handler: createProductHandler
    });
};

export default productRoutes;