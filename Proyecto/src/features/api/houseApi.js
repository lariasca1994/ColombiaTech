import axios from 'axios';

const baseUrl = '/api/houses';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newHouse) => {
  const response = await axios.post(baseUrl, newHouse);
  return response.data;
};

const update = async (id, updatedHouse) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedHouse);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, create, update, remove };