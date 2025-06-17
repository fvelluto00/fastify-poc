import { ProductSchema } from "../../../models/api/database/product.model";
import { Type } from "@sinclair/typebox";
import { Static } from "@sinclair/typebox";

export const GetProductByIdParamsDTO = Type.Object({
    productId: Type.String({
        description: "Unique identifier for the product",
        default: "12345"
    })
});
export const GetProductByIdResponseDTO = ProductSchema;
export const CreateProductRequestDTO = Type.Omit(ProductSchema, ["id"]);
export const CreateProductResponseDTO = ProductSchema;

export type GetProductByIdParamsDTOType = Static<typeof GetProductByIdParamsDTO>;
export type GetProductByIdResponseDTOType = Static<typeof GetProductByIdResponseDTO>;
export type CreateProductRequestDTOType = Static<typeof CreateProductRequestDTO>;
export type CreateProductResponseDTOType = Static<typeof CreateProductResponseDTO>;