import { ProfileType } from '../profile/types.js';
import { PostType } from '../post/types.js';
import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },

    name: { type: GraphQLString },

    balance: { type: GraphQLFloat },

    profile: {
      type: ProfileType,
      resolve: async ({ id }) =>
        await prismaClient.profile.findFirst({ where: { userId: id } }),
    },

    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }) => {
        const results = await prismaClient.subscribersOnAuthors.findMany({
          where: { authorId: id },
          select: { subscriber: true },
        });
        
        return results.map((result) => result.subscriber);
      },
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }) => {
        const results = await prismaClient.subscribersOnAuthors.findMany({
          where: { subscriberId: id },
          select: { author: true },
        });

        return results.map((result) => result.author);
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }) =>
        await prismaClient.post.findMany({ where: { authorId: id } }),
    },
  }),
});
