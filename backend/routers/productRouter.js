import express from "express";
import update from "../middleware/multer.js";
import { addProduct, listProduct, removeProduct, singleProduct } from "../controllers/productController.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  update.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  adminAuth,
  addProduct
);

productRouter.post("/remove",adminAuth, removeProduct);

productRouter.post("/single", singleProduct);

productRouter.get("/list", listProduct);


export default productRouter;