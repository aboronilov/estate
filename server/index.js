import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import userRouter from "./routes/user.routes.js"
import propertyRouter from "./routes/property.routes.js"

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send({ message: "Hello Estate" });
});

app.use("/api/v1/users", userRouter)
app.use("/api/v1/properties", propertyRouter)

const port = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, console.log(`server is running on ${port} port`));
  } catch (error) {
    console.log(`startServer error - ${error.message}`);
  }
};

startServer();
