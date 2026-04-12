import axios from 'axios';
import API_BASE_URL from '../../config/apiConfig';

const BASE_URL = `${API_BASE_URL}/contributions`;

export const getContributionsByEmail = async (email) => {
  return await axios.get(`${BASE_URL}/showContributions/${email}`);
};

export const updateContributionById = async (id, data) => {
  await axios.put(`${BASE_URL}/updateContribution/${id}`, data);
};

export const deleteContributionById = async (id) => {
  await axios.delete(`${BASE_URL}/deleteContribution/${id}`);
};