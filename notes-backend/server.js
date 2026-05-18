const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes");
const errorHandler = require("./middleware/errorHandler");

require("dotenv").config();

const app = express();

// ✅ Connect DB
connectDB();

// ✅ Middleware
app.use(cors());            
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// ✅ Error handler (last)
app.use(errorHandler);

app.listen(5000, () => console.log("Server running on port 5000"));