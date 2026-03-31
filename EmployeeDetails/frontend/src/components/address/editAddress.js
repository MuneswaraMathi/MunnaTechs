
import axios from "axios";

const BASE_URL = "http://localhost:8080/address";

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