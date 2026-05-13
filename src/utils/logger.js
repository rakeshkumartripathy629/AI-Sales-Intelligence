const getTimestamp = () => {
  return new Date().toISOString();
};

export const logger = {
  info: (message, data = "") => {
    console.log(
      `[INFO] ${getTimestamp()} - ${message}`,
      data
    );
  },

  warn: (message, data = "") => {
    console.warn(
      `[WARN] ${getTimestamp()} - ${message}`,
      data
    );
  },

  error: (message, error = "") => {
    console.error(
      `[ERROR] ${getTimestamp()} - ${message}`,
      error
    );
  }
};