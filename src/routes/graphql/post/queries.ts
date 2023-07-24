import { PostType } from './types.js';
import { GraphQLList, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export const PostQueries = {
  post: {
    type: PostType,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (_, { id }) =>
      await prismaClient.post.findFirst({ where: { id: id } }),
  },

  posts: {
    type: new GraphQLList(PostType),
    resolve: async () => await prismaClient.post.findMany(),
  },
};
