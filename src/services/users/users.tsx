import { API_URL } from "../../constants";
const axios = require("axios");

export const getUserByName = (username: string) => {
    return axios.get(API_URL + "/user/" + username);
}