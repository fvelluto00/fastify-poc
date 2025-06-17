import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'

async function fastifyMongoDBInterface(fastify, options) {
  if(!fastify.test__mockDatabase) {
    fastify.register(fastifyMongo, {
      url: 'mongodb://mongodb:27017/fastify-poc'
    });
  }
}

export default fastifyPlugin(fastifyMongoDBInterface);