import axios from 'axios';

export const getContributionsByEmail = async (email) => {
  return await axios.get(
    `http://localhost:8080/contributions/showContributions/${email}`
  );
};