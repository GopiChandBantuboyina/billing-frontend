// Make Calls to the backend server
import axios from "axios";


export const login = async (data) => {
  return await axios.post(
    "http://localhost:8080/api/v1.0/login",
    data
  );
};
