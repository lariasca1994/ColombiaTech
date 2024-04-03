const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { ApolloServer, gql } = require('apollo-server-express');
const { Pool } = require('pg');
const houseRoutes = require('./routes/houseRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL connection setup
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// GraphQL schema
const typeDefs = gql`
  type Query {
    houses: [House]
    users: [User]
  }

  type House {
    id: ID!
    address: String!
    city: String!
    state: String!
    size: Int!
    type: String!
    zipCode: String!
    code: String!
    rooms: Int!
    bathrooms: Int!
    price: Int!
    image: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }
`;

// GraphQL resolvers
const resolvers = {
  Query: {
    houses: async () => {
      const query = 'SELECT * FROM houses';
      const { rows } = await pool.query(query);
      return rows;
    },
    users: async () => {
      const query = 'SELECT * FROM users';
      const { rows } = await pool.query(query);
      return rows;
    }
  }
};

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes setup
app.use('/api/houses', houseRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});