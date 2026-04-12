import axios from "axios";
import API_BASE_URL from "../../config/apiConfig";

const BASE_URL = `${API_BASE_URL}/expenses`;

export const updateExpenseById = async (id, data) => {
  await axios.put(`${BASE_URL}/updateExpense/${id}`, data);
};

export const deleteExpenseById = async (id) => {
  await axios.delete(`${BASE_URL}/deleteExpense/${id}`);
};
