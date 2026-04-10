import axios from 'axios';
import API_BASE_URL from '../../config/apiConfig';

const BASE_URL = `${API_BASE_URL}/personalDetails`;

export const getPersonalInfoByEmail = async (email) => {
  return await axios.get(`${BASE_URL}/showPersonalInfo/${email}`);
};

export const updatePersonalInfoById = async (id, data) => {
  return await axios.put(`${BASE_URL}/updatePersonalInfo/${id}`, data);
};