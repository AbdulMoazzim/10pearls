import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import pinoHttp from "pino-http";
import rateLimit from "express-rate-limit";
import { errorHandler, notFound } from "./middlewares/errorMiddleware";
import authRoutes from "./routes/authRoutes";
import notesRoutes from "./routes/notesRoutes";
import logger from "./utils/logger";

const app: Application = express();

// Security middleware
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  }),
);

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// HTTP request logger (development only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  // Pino HTTP logger
  app.use(pinoHttp({ logger }));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

app.use("/api", limiter);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
