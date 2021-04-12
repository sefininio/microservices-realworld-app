import axios from 'axios';

const profileFeatureBaseUrl = 'http://localhost:3336/api';

export const getProfile = async (username, authHeader) => {
  const url = `${profileFeatureBaseUrl}/profiles/${username}`;
  const profile = await axios.get(url, {headers: authHeader});
  return profile.data;
}

export const addFollow = async (username, authHeader) => {
  const url = `${profileFeatureBaseUrl}/profiles/${username}/follow`;
  const profile = await axios.post(url, {}, {headers: authHeader});
  return profile.data;
}

export const removeFollow = async (username, authHeader) => {
  const url = `${profileFeatureBaseUrl}/profiles/${username}/follow`;
  const profile = await axios.delete(url, {headers: authHeader});
  return profile.data;
}
