import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateProductRequestDTOType, CreateProductResponseDTOType, GetProductByIdParamsDTOType, GetProductByIdResponseDTOType } from "../../../dtos/api/database/product.dto";
import { Product } from "../../../models/api/database/product.model";
import { NotFoundErrorDTOType } from "../../../dtos/api/errors.dto";

type GetProductByIdDTO = {
    Params: GetProductByIdParamsDTOType;
    Reply: {
        200: GetProductByIdResponseDTOType;
        404: NotFoundErrorDTOType;
    }
};

export const getProductByIdHandler = async (
    request: FastifyRequest<GetProductByIdDTO>,
    reply: FastifyReply<GetProductByIdDTO>  
) => {
    const { productId } = request.params;
    const fastify: FastifyInstance = request.server;
    const product = await fastify.mongo.db.collection<Product>('products').findOne({ id: productId });

    if (!product) {
        const notFoundError: NotFoundErrorDTOType = {
            message: `Product with id: ${productId} not found`
        };

        return reply.status(404).send(notFoundError);
    }

    const response: GetProductByIdResponseDTOType = {
        id: product.id,
        name: product.name,
        price: product.price,
        inStock: product.inStock
    };

    reply.status(200).send(response);
}

type CreateProductDTO = {
    Body: CreateProductRequestDTOType,
    Reply: {
        201: CreateProductResponseDTOType;
    }
};

export const createProductHandler = async (
    request: FastifyRequest<CreateProductDTO>,
    reply: FastifyReply<CreateProductDTO>
) => {
    const newProduct: CreateProductRequestDTOType = request.body;
    const product: Product = {
        id: crypto.randomUUID(),
        name: newProduct.name,
        price: newProduct.price,
        inStock: newProduct.inStock
    };

    const fastify: FastifyInstance = request.server;
    await fastify.mongo.db.collection('products').insertOne(product);

    const response: CreateProductResponseDTOType = {
        id: product.id,
        name: product.name,
        price: product.price,
        inStock: product.inStock
    };

    reply.status(201).send(response);
};