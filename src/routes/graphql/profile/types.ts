import { MemberTypeId, MemberType } from '../member/types.js';
import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { PrismaClient } from '@prisma/client';
import { UserType } from '../user/types.js';

const prismaClient = new PrismaClient();

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeId },
    memberType: {
      type: MemberType,
      resolve: async ({ memberTypeId }) =>
        await prismaClient.memberType.findFirst({ where: { id: memberTypeId } }),
    },
    userId: { type: UUIDType },
    user: {
      type: UserType,
      resolve: async ({ userId }) =>
        prismaClient.user.findFirst({ where: { id: userId } }),
    },
  }),
});
