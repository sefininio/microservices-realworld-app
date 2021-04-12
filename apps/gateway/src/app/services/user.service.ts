import axios from 'axios';

const userFeatureBaseUrl = 'http://localhost:3334/api';

export const login = async (input) => {
  console.log(input);

  const url = `${userFeatureBaseUrl}/auth/login`;
  const token = await axios.post(url, input);
  return token.data;
}

export const getUser = async (id?, username?, email?) => {
  let url: string;

  if (id) {
    url = `${userFeatureBaseUrl}/user/${id}`;
  }

  if (username) {
    url = `${userFeatureBaseUrl}/user/username/${username}`;
  }

  if (email) {
    url = `${userFeatureBaseUrl}/user/email/${email}`;
  }

  const user = await axios.get(url);
  return user.data;
}

export const getMe = async (authHeader) => {
  const url = `${userFeatureBaseUrl}/user`;
  const user = await axios.get(url, {headers: authHeader});
  return user.data;
}

export const create = async (input) => {
  const url = `${userFeatureBaseUrl}/user`;
  const user = await axios.post(url, input);
  return user.data;
}

export const update = async (input, authHeader) => {
  const url = `${userFeatureBaseUrl}/user`;
  const user = await axios.put(url, input, {headers: authHeader});
  return user.data;
}
