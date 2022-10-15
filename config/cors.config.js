const cors = require("cors");
const createError = require("http-errors");
let allowedOrigins = [];
if (process.env.CORS_ORIGINS) {
  allowedOrigins = process.env.CORS_ORIGINS.split(",").map((origin) =>
    origin.trim()
  );
}
const corsOptions = {
  credentials: true,
  origin: function (origin, next) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      next(null, true);
    } else {
      next(createError(401, "Not allowed by CORS"));
    }
  },
};
module.exports =
  allowedOrigins.length > 0 ? cors(corsOptions) : (req, res, next) => next();
