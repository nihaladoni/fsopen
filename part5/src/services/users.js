import axios from "axios";
const baseUrl = "/api/login";

const login = async (formData) => {
  try {
    const request = await axios.post(baseUrl, formData);
    const data = request.data;

    return data;
  } catch (error) {
    return error;
  }
};

export default login;
