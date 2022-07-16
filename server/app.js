const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

// Initializing Express App
const app = express();

// Middleware
app.use(express.json({ limit: "200mb", extended: true }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(cors());

// Routes
app.use("/public_html/guardAddress", require("./routes/guardAddress"));
app.use("/public_html/jobAddress", require("./routes/jobAddress"));
app.use("/public_html/companyAddress", require("./routes/companyAddress"));
app.use("/public_html/banks", require("./routes/bank"));
app.use("/public_html/companies", require("./routes/company"));
app.use("/public_html/documents", require("./routes/documents"));
app.use("/public_html/guards", require("./routes/guard"));
app.use("/public_html/jobs", require("./routes/jobs"));
app.use("/public_html/shifts", require("./routes/shift"));
app.use("/public_html/auth", require("./routes/auth"));
app.use("/public_html/profile", require("./routes/profile"));
app.use("/public_html/otherDocs", require("./routes/otherDocs"));
app.use("/public_html/cards", require("./routes/card"));
app.use("/public_html/companyDocuments", require("./routes/companyDocuments"));

// Starting the App
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
