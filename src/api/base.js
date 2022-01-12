import Axios from 'axios';
import { API_HOST } from 'Constants';
import { makeUseAxios } from 'axios-hooks';

const axiosInstance = Axios.create({
  baseURL: API_HOST,
});

const useApiAxios = makeUseAxios({ axios: axiosInstance });

export { axiosInstance, useApiAxios };
