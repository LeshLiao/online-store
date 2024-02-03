import axios from 'axios';

export const getAllItems = async () => {
  const { data } = await axios.get('/api/items');
  return data;
};

export const getItemById = async itemId => {
  const { data } = await axios.get('/api/items/' + itemId);
  return data;
};

export const searchItem = async searchTerm => {
  const { data } = await axios.get('/api/items/search/' + searchTerm);
  return data;
};

export const getAllTagsItems = async () => {
  const { data } = await axios.get('/api/items/tags');
  return data;
};

export const getAllByTag = async tag => {
  if (tag === 'All') return getAllItems();
  const { data } = await axios.get('/api/items/tag/' + tag);
  return data;
};

export async function deleteById(itemId) {
  await axios.delete('/api/items/' + itemId);
};

export async function update(item) {
  await axios.put('/api/items', item);
};

export async function add(item) {
  const { data } = await axios.post('/api/items', item);
  return data;
};