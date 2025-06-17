import { Type, Static } from '@sinclair/typebox';

export const ProductSchema = Type.Object({
    id: Type.String({
        description: 'Unique identifier for the product',
        format: 'uuid'
    }),
    name: Type.String({ 
        description: 'Name of the product',
        minLength: 1 
    }),
    price: Type.Number({ 
        description: 'Price of the product',
        minimum: 0 
    }),
    inStock: Type.Boolean({
        description: 'Availability of the product'
    }),
}, { additionalProperties: false });

export type Product = Static<typeof ProductSchema>;