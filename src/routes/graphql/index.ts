import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import { graphql, validate, parse } from 'graphql';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query: source, variables: variableValues } = req.body;

      const errors = validate(schema, parse(source), [depthLimit(5)]);

      if (errors && errors.length > 0) {
        return { data: '', errors };
      }

      const res = await graphql({
        schema,
        source,
        variableValues,
      });

      const { data } = res;

      return { data };
    },
  });
};

export default plugin;
