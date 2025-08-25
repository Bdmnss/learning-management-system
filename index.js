import express from "express";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello, learning management system!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
