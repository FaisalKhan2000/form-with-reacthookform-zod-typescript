import "express-async-errors";
import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
config({
  path: "./.env",
});

// importing middlewares
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./routes/user.js";

// environment variables
const port = process.env.PORT;
const node_env = process.env.NODE_ENV || "development";
const mongo_url = process.env.MONGODB_URI;

if (node_env === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(express.json());

app.get("/test", (req, res, next) => {
  res.send("test");
});

// using middlewares
app.use("/api/v1/auth", userRouter);
app.use(errorMiddleware);

const startServer = async () => {
  try {
    const connection = await mongoose.connect(mongo_url!, {
      dbName: "basic_form",
    });

    console.log(`DB Connected to ${connection.connection.host}`);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
};

startServer();
