const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const getHouses = async () => {
  try {
    await client.connect();
    const houses = await client.db().collection('houses').find().toArray();
    return houses;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

const getHouseById = async (id) => {
  try {
    await client.connect();
    const house = await client.db().collection('houses').findOne({ _id: id });
    return house;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

const createHouse = async (house) => {
  try {
    await client.connect();
    const result = await client.db().collection('houses').insertOne(house);
    return result.ops[0];
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

const updateHouse = async (id, updatedHouse) => {
  try {
    await client.connect();
    const result = await client.db().collection('houses').updateOne({ _id: id }, { $set: updatedHouse });
    return result.modifiedCount > 0;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

const deleteHouse = async (id) => {
  try {
    await client.connect();
    const result = await client.db().collection('houses').deleteOne({ _id: id });
    return result.deletedCount > 0;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

module.exports = { getHouses, getHouseById, createHouse, updateHouse, deleteHouse };