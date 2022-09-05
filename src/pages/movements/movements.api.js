import Axios from 'axios';

const url = `${process.env.BASE_API_URL}/movements`;

export const getAllMovements = () =>
  Axios.get(url).then((response) => response.data);

export const getMovementsAccount = (accountId) =>
  Axios.get(url, {params:{accountId}}).then((response) => response.data);
