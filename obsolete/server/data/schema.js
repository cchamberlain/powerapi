import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

let data =  { '1': 'leebyron'
            , '2': 'enaqx',
            , '3': 'schrockn'
            , '4': 'andimarek'
            }

export default new GraphQLSchema(
  { query: new GraphQLObjectType(
    { name: 'RootQueryType'
    , fields:
      { contributor:
        { type: GraphQLString
        , args: { id: { type: GraphQLString }
                }
        , resolve: (root, {id}) => data[id]
        }
      }
    })
  })
