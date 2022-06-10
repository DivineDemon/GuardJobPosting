import express from "express";
import cors from "cors";
import "dotenv/config";
import { errorHandler } from "./middleware/errorMiddleware.js";

// Importing Routes
import { router as guardAddressRoute } from "./routes/guardAddress.js";
import { router as jobAddressRoute } from "./routes/jobAddress.js";
import { router as companyAddressRoute } from "./routes/companyAddress.js";
import { router as bankRoute } from "./routes/bank.js";
import { router as companyRoute } from "./routes/company.js";
import { router as documentsRoute } from "./routes/documents.js";
import { router as guardRoute } from "./routes/guard.js";
import { router as jobsRoute } from "./routes/jobs.js";
import { router as shiftRoute } from "./routes/shift.js";
import { router as authRoute } from "./routes/auth.js";
import { router as profileRoute } from "./routes/profile.js";
import { router as otherDocsRouter } from "./routes/otherDocs.js";

// Initializing Express App
const app = express();

// Middleware
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(errorHandler);

// Routes
app.use("/", (req, res) => {
  res.status(200).json({ message: "Base URL Working!" });
});
app.use("/guardAddress", guardAddressRoute);
app.use("/jobAddress", jobAddressRoute);
app.use("/companyAddress", companyAddressRoute);
app.use("/banks", bankRoute);
app.use("/companies", companyRoute);
app.use("/documents", documentsRoute);
app.use("/guards", guardRoute);
app.use("/jobs", jobsRoute);
app.use("/shifts", shiftRoute);
app.use("/auth", authRoute);
app.use("/profile", profileRoute);
app.use("/otherDocs", otherDocsRouter);

// Starting the App
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
