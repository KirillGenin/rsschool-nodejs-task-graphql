import { UserType } from './types.js';
import { UUIDType } from '../types/uuid.js';
import { GraphQLList } from 'graphql';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export const UserQueries = {
  user: {
    type: UserType,
    args: { id: { type: UUIDType } },
    resolve: async (_, { id }) => prismaClient.user.findFirst({ where: { id } }),
  },

  users: {
    type: new GraphQLList(UserType),
    resolve: async () => prismaClient.user.findMany(),
  },
};