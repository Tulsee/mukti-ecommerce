import express from "express";
import morgan from "morgan";
import cors from "cors";
import api from "./app.routes";

const app: express.Application = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});
app.use("/api/v1", api);

export default app;
