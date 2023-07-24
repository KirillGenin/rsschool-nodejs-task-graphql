import { ProfileQueries } from './profile/queries.js';
import { UserQueries } from './user/queries.js';
import { MemberTypeQueries } from './member/queries.js';
import { PostQueries } from './post/queries.js';
import { GraphQLObjectType } from 'graphql/index.js';

export const Queries = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...ProfileQueries,
    ...UserQueries,
    ...MemberTypeQueries,
    ...PostQueries,
  }),
});
