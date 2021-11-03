import { API_URL } from "../../constants";
const axios = require("axios");

export const postOrder = (order: any) => {
  return axios.post(API_URL + "/sell/finalize", order);
};
