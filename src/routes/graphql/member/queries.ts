import { MemberTypeId, MemberType } from './types.js';
import { GraphQLList, GraphQLNonNull } from 'graphql';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export const MemberTypeQueries = {
  memberType: {
    type: MemberType,
    args: {
      id: { type: new GraphQLNonNull(MemberTypeId) },
    },
    resolve: async (_, { id }) =>
      await prismaClient.memberType.findFirst({ where: { id } }),
  },

  memberTypes: {
    type: new GraphQLList(MemberType),
    resolve: async () => await prismaClient.memberType.findMany(),
  },
};
