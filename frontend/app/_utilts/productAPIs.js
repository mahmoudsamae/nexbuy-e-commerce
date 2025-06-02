const { default: axiosClient } = require("./axiosClient");

// Get All Product
const getAllProduct = async () => {
  try {
    const response = await axiosClient.get("/api/product/list");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Add Product To the Cart
const addProductToCart = async (itemId, size, token) => {
  try {
    const response = await axiosClient.post(
      "/api/cart/add",
      { itemId, size },
      { headers: { token } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// remove product from cart 
// const removeProduct = async (id) => {
//   try {
//     const response = await axiosClient.post(
//       "/api/cart/add",
//       { itemId, size },
//       { headers: { token } }
//     );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// update Cart
const updateCartData = async (itemId, size, quantity, token) => {
  try {
    const response = await axiosClient.post(
      "/api/cart/update",
      { itemId, size, quantity },
      { headers: { token } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// update Cart
const getCartData = async (token) => {
  try {
    const response = await axiosClient.post(
      "/api/cart/get",
      {},
      { headers: { token } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};



export { getAllProduct, addProductToCart, updateCartData, getCartData };
