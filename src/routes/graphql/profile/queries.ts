import { ProfileType } from './types.js';
import { GraphQLList } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';

const prismaClient = new PrismaClient();

export const ProfileQueries = {
  profile: {
    type: ProfileType,
    args: { id: { type: UUIDType } },
    resolve: async (_, { id }) => await prismaClient.profile.findFirst({ where: { id } }),
  },

  profiles: {
    type: new GraphQLList(ProfileType),
    resolve: async () => await prismaClient.profile.findMany({}),
  },
};
