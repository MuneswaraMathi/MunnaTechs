import axios from "axios";
import API_BASE_URL from "../../config/apiConfig";

const BASE_URL = `${API_BASE_URL}/events`;

export const updateEventById = async (id, data) => {
  await axios.put(`${BASE_URL}/updateEvent/${id}`, data);
};

export const deleteEventById = async (id) => {
  await axios.delete(`${BASE_URL}/deleteEvent/${id}`);
};
