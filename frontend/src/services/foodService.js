import { sample_foods, sample_tags } from "../data";
import axios from 'axios';

export const getAll = async () => {
  console.log('get data /api/foods');
  const { data } = await axios.get('/api/foods');
  return data;
};

// export const getAll = async () => {
//   const response = await fetch('https://food-store-backend-mek5.onrender.com/api/foods');
//   const json = await response.json();
//   console.log('using fetch function to get data. /api/foods');
//   console.log(json);
//   return json;
// };

export const search = async searchTerm => {
  const { data } = await axios.get('/api/foods/search/' + searchTerm);
  return data;
};

export const getAllTags = async () => {
  const { data } = await axios.get('/api/foods/tags');
  return data;
};

// export const getAllTags = async () => {
//   const response = await fetch('https://food-store-backend-mek5.onrender.com/api/foods/tags');
//   const json = await response.json();
//   console.log('using fetch function to get data. /api/foods/tags');
//   console.log(json);
//   return json;
// };

export const getAllByTag = async tag => {
  if (tag === 'All') return getAll();
  const { data } = await axios.get('/api/foods/tag/' + tag);
  return data;
};

export const getById = async foodId => {
  const { data } = await axios.get('/api/foods/' + foodId);
  return data;
};

/* Mock dataset (for debug) */
// export const getById = async foodId =>
//   sample_foods.find(item => item.id === foodId);

export async function deleteById(foodId) {
  await axios.delete('/api/foods/' + foodId);
};

export async function update(food) {
  await axios.put('/api/foods', food);
};

export async function add(food) {
  const { data } = await axios.post('/api/foods', food);
  return data;
};