import axios from 'axios';
import API_BASE_URL from '../../config/apiConfig';

export const getContributionsByEmail = async (email) => {
  return await axios.get(
    `${API_BASE_URL}/contributions/showContributions/${email}`
  );
};