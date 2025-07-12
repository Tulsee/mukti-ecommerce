import rateLimit from "express-rate-limit";

export const apiRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: {
    status: "error",
    message: "Too many requests, please try again later after 2 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
