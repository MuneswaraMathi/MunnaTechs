import axios from 'axios';

const BASE_URL = 'http://localhost:8080/personalDetails';

export const getPersonalInfoByEmail = async (email) => {
  return await axios.get(`${BASE_URL}/showPersonalInfo/${email}`);
};

export const updatePersonalInfoById = async (id, data) => {
  return await axios.put(`${BASE_URL}/updatePersonalInfo/${id}`, data);
};