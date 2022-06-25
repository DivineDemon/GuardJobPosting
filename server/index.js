const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");

// Initializing Express App
const app = express();

// Middleware
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(errorHandler);

// Routes
app.use("/guardAddress", require("./routes/guardAddress"));
app.use("/jobAddress", require("./routes/jobAddress"));
app.use("/companyAddress", require("./routes/companyAddress"));
app.use("/banks", require("./routes/bank"));
app.use("/companies", require("./routes/company"));
app.use("/documents", require("./routes/documents"));
app.use("/guards", require("./routes/guard"));
app.use("/jobs", require("./routes/jobs"));
app.use("/shifts", require("./routes/shift"));
app.use("/auth", require("./routes/auth"));
app.use("/profile", require("./routes/profile"));
app.use("/otherDocs", require("./routes/otherDocs"));
app.use("/cards", require("./routes/card"));

// app.use("/", (req, res) => {
//   res.status(200).json({ message: "Base URL Working!" });
// });

// Starting the App
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
