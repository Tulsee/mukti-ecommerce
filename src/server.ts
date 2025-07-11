import * as dotenv from "dotenv";
dotenv.config();

import app from "./app.module";
import { checkDbConnection } from "./db";

const PORT = process.env.PORT;

const startServer = async () => {
  await checkDbConnection();

  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(() => {
      console.log("Process terminated");
      process.exit(0);
    });
  });

  process.on("SIGINT", () => {
    console.log("SIGINT received, shutting down gracefully");
    server.close(() => {
      console.log("Process terminated");
      process.exit(0);
    });
  });
};

startServer();
