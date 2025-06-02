import express from "express";
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe, updateStatus, verify } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// for admin 
orderRouter.post("/list", adminAuth, getAllOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// payment
orderRouter.post("/place", authUser, placeOrderCOD);
orderRouter.post("/stripe", authUser, placeOrderStripe);

// verify payment
orderRouter.post("/verifystripe",authUser, verify);

// user order for frontend
orderRouter.post("/userorders",authUser, getUserOrders);


export default orderRouter