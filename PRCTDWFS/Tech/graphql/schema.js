const { GraphQLID, GraphQLNonNull,
  GraphQLObjectType,
  GraphQLBoolean, 
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLSchema} = require('graphql')
const resolvers = require('./resolvers')

const User = new GraphQLObjectType({
name: 'User',
fields: {
_id: { type: GraphQLString},
name: { type: GraphQLString},
lastname: { type: GraphQLString},
email: { type: GraphQLString},
avatar: { type: GraphQLString}
}
})

const House = new GraphQLObjectType({
name : 'House',
fields:{
  address: {type: GraphQLString},
  city: {type: GraphQLString},
  state:{type: GraphQLString},
  size: {type: GraphQLString},
  type: {type:GraphQLString},
  price:{type: GraphQLString},
  code: {type: GraphQLString}
}
})

const Message = new GraphQLObjectType({
name: 'Message',
fields: {
_id: { type: GraphQLString},
body: { type: GraphQLString},
from: { type: User},
to: { type: User},
readed: {type: GraphQLBoolean}
}
})


const UserFilterInput = new GraphQLInputObjectType({
name: 'UserFilterInput',
fields: {
name: {type: GraphQLString},
lastname: {type: GraphQLString},
email: {type: GraphQLString}
}
})

const HousesFilterInput = new GraphQLInputObjectType({
name : 'HousesFilterInput',
fields:{
city:{type:GraphQLString},
price:{type:GraphQLString},
type: {type:GraphQLString}
}
})

const MessageFilterInput = new GraphQLInputObjectType({
  name: 'MessageFilterInput',
  fields: {
    body: {type: GraphQLString},
    from: {type: GraphQLString},
    to: {type: GraphQLString}
  }
})

const queries = {

hello: {
type: GraphQLString, // Tipo de respuesta
resolve: resolvers.hello
},

User: {
type: User,
resolve: resolvers.User,
args: {
id: {type: GraphQLString}
}
},

Users: {
type: new GraphQLList(User),
resolve: resolvers.Users
},


House:{
type:House,
resolve:resolvers.House,
args:{
code: {type:GraphQLString}
}
},

Houses:{
type: new GraphQLList(House),
resolve: resolvers.Houses
},


Message: {
  type: Message,
  resolve: resolvers.Message,
  args: {
    id: { type:(GraphQLString) }, // Utiliza GraphQLNonNull para hacer que el ID sea obligatorio
    //fromId: { type:(GraphQLString) }, // Cambia 'from' a 'fromId' y hazlo obligatorio
    //toId: { type:(GraphQLString) }, // Cambia 'to' a 'toId' y hazlo obligatorio
    body:{type:(GraphQLString)}
  }
},

Messages:{
  type: new GraphQLList(Message),
  resolve:resolvers.Messages
},

UsersByFilter: {
type: new GraphQLList(User),
resolve: resolvers.UsersByFilter,
args: {
filter: { type: UserFilterInput }
}
},

HousesByFilter :{
type: new GraphQLList(House),
resolve: resolvers.HousesByFilter,
args:{
filter:{type: HousesFilterInput}
   }

 },

 MessagesByFilter: {
  type: new GraphQLList(Message),
  resolve: resolvers.MessagesByFilter,
  args: {
    filter: { type: MessageFilterInput }
  }
}

}

const queryType = new GraphQLObjectType({
name: 'Query',
fields: queries
})

const schema = new GraphQLSchema({
query: queryType
})

module.exports = schema