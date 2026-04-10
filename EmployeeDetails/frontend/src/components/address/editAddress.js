
import axios from 'axios';
import API_BASE_URL from '../../config/apiConfig';

const BASE_URL = `${API_BASE_URL}/address`;

export const getAddressesByEmail = async (email) => {
  const res = await axios.get(`${BASE_URL}/getAddress/${email}`);
  return res.data;
};

export const updateAddressById = async (id, data) => {
  await axios.put(`${BASE_URL}/updateAddress/${id}`, data);
};

export const deleteAddressById = async (id) => {
  await axios.delete(`${BASE_URL}/deleteAddress/${id}`);
};