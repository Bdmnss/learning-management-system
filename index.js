import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import lectureRoutes from "./routes/lectureRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";

const app = express();
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/courses", lectureRoutes);
app.use("/api/courses", assignmentRoutes);
app.use("/api/assignments", submissionRoutes);

app.get("/", (req, res) => {
  res.send("Hello, learning management system!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
