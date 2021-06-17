import axios from "axios";

export default () => {
  return axios.create({
    baseURL: "https://dbodhi-clone.herokuapp.com/api",
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
    },
  });
};
