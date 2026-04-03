import axios from "axios";

const BASE_URL = "http://localhost:8080/activities";

export const updateActivityById = async (id, data) => {
  await axios.put(`${BASE_URL}/updateActivity/${id}`, data);
};

export const deleteActivityById = async (id) => {
  await axios.delete(`${BASE_URL}/deleteActivity/${id}`);
};
