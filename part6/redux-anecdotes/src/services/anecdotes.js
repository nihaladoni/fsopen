import axios from "axios";

const URI = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const response = await axios.get(URI);
  return await response.data;
};
export const incrementVote = async (obj) => {
  const response = await axios.put(`${URI}/${obj.id}`, obj);
  return await response.data;
};
export const create = async (obj) => {
  const response = await axios.post(URI, obj);
  return await response.data;
};
