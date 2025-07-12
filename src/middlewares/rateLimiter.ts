import rateLimit from "express-rate-limit";

export const apiRateLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 10,
  message: {
    status: "error",
    message: "Too many requests, please try again later after 2 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
