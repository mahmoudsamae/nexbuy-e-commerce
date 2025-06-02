const { default: axiosClient } = require("./axiosClient");

const userRegister = async (data) => {
  try {
    const {name, email, password} = data;
    const response = await axiosClient.post("/api/user/register", {name, email, password});
    return response
  } catch (error) {
    console.log(error);
  }
}
const userLogin = async (data) => {
  try {
    const { email, password} = data;
    const response = await axiosClient.post("/api/user/login", {
      email,
      password,
    });
    return response
  } catch (error) {
    console.log(error);
  }
}

export { userRegister, userLogin };