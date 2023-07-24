import { GraphQLObjectType, GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { ProfileType } from '../profile/types.js';

const prismaClient = new PrismaClient();

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: 'basic' },
    business: { value: 'business' },
  },
});

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async ({ id }) => {
        await prismaClient.profile.findMany({ where: { memberTypeId: id } });
      },
    },
  }),
});