const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const getUsers = async () => {
  try {
    await client.connect();
    const users = await client.db().collection('users').find().toArray();
    return users;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

const getUserById = async (id) => {
  try {
    await client.connect();
    const user = await client.db().collection('users').findOne({ _id: id });
    return user;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

const createUser = async (user) => {
  try {
    await client.connect();
    const result = await client.db().collection('users').insertOne(user);
    return result.ops[0];
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

const updateUser = async (id, updatedUser) => {
  try {
    await client.connect();
    const result = await client.db().collection('users').updateOne({ _id: id }, { $set: updatedUser });
    return result.modifiedCount > 0;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

const deleteUser = async (id) => {
  try {
    await client.connect();
    const result = await client.db().collection('users').deleteOne({ _id: id });
    return result.deletedCount > 0;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };