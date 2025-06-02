
const { default: axiosClient } = require("./axiosClient")

const payWithCOD = async (orderData, token) => {
  try {
    const response = await axiosClient.post("/api/order/place", orderData, {
      headers: {token},
    });
    return response
  } catch (error) {
    console.log(error.message);
  }
}

// pay with stripe 
const payWithStripe = async (orderData, token) => {
  try {
    const response = await axiosClient.post("/api/order/stripe", orderData, {
      headers: { token },
    });
    return response
  } catch (error) {
    console.log(error.message);
  }
}

// verify after stripe
const verifyStripe = async (success, orderId, token) => {
  try {
    const response = await axiosClient.post("/api/order/verifystripe", {success, orderId}, {headers: {token}});
    return response;
  } catch (error) {
    console.log(error);
  }
} 


const getUserOrders = async (token) => {
  try {
    const response = await axiosClient.post("/api/order/userorders", {}, {headers: {token}});
    return response;
  } catch (error) {
    console.log(error);
  }
}

export { payWithCOD, getUserOrders, payWithStripe, verifyStripe };