import axios from "axios";
import API_BASE_URL from "../../config/apiConfig";

const BASE_URL = `${API_BASE_URL}/team`;

export const updateTeamById = async (id, data) => {
  await axios.put(`${BASE_URL}/updateTeam/${id}`, data);
};

export const deleteTeamById = async (id) => {
  await axios.delete(`${BASE_URL}/deleteTeam/${id}`);
};
