import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://127.0:8080/api",
  headers: {
    "Content-Type": "application/json",
  }

});