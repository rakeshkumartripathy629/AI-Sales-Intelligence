import { logger } from "../utils/logger.js";

export const errorHandler = (
  err,
  req,
  res,
  next
) => {
  logger.error(
    "GLOBAL ERROR",
    err.message
  );

  return res.status(500).json({
    success: false,
    error:
      err.message || "Internal Server Error"
  });
};