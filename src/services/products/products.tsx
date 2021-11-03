import { API_URL } from "../../constants";
const axios = require("axios");

export const getProducts = () => {
  return axios.get(API_URL + "/products");
};

export const getProductsById = (id: number) => {
  return axios.get(API_URL + "/products/id/" + id);
};
