import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import cartRouter from "./routers/cartRouter.js";
import orderRouter from "./routers/orderRouter.js";

// App Config
const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:3000", // رابط ال Frontend
  process.env.ADMIN_URL || "http://localhost:8000", // رابط ال Admin
];

connectDB();
connectCloudinary();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Api endPoints
app.get("/", (req, res) => {
  res.send("server working");
});

app.listen(PORT, () => {
  console.log("server running on port :" + PORT);
});
