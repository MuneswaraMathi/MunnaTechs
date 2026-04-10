import axios from "axios";
import API_BASE_URL from "../../config/apiConfig";

const BASE_URL = `${API_BASE_URL}/activities`;

export const updateActivityById = async (id, data) => {
  await axios.put(`${BASE_URL}/updateActivity/${id}`, data);
};

export const deleteActivityById = async (id) => {
  await axios.delete(`${BASE_URL}/deleteActivity/${id}`);
};
