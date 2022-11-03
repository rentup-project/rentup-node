require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("./config/db.config");
require("./config/passport.config");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

/*SOCKET*/
const server = require("http").createServer(app);
const options = { cors: { origin: '*' } };
const io = require("socket.io")(server, options);

const onlineUsers = [];

const addNewUser = (email, name, socketID) => {
  !onlineUsers.some((user) => user.email === email) && onlineUsers.push({ email, name, socketID })
};

const removeUser = (socketID) => {
  return onlineUsers.forEach((user, index) => {
    if (user.socketID === socketID) {
      return onlineUsers.splice(index, 1)
    }
  })
};

io.on("connection", socket => {
  socket.on('newUser', (user) => {
    addNewUser(user.email, user.name, socket.id);
  })

  socket.on('disconnect', () => {
    removeUser(socket.id)
  })
});


const routes = require("./config/routes.config");
app.use("/api", routes);

/* Handle errors */
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

app.use((error, req, res, next) => {
  if (error instanceof mongoose.Error.ValidationError) {
    error = createError(400, error);
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(404, "Resource not found");
  } else if (error.message.includes("E11000")) {
    error = createError(400, "Email already exists. Login to your account.");
  } else if (error instanceof jwt.JsonWebTokenError) {
    error = createError(401, error);
  } else if (!error.status) {
    error = createError(500, error);
  }

  if (error.status >= 500) {
    console.error(error);
  }

  const data = {};
  data.message = error.message;
  data.errors = error.errors
    ? Object.keys(error.errors).reduce(
        (errors, key) => ({
          ...errors,
          [key]: error.errors[key].message || error.errors[key],
        }),
        {}
      )
    : undefined;

  res.status(error.status).json(data);
});

server.listen(process.env.PORT || 3001, () => {
  console.log("App in process at", process.env.PORT || 3001);
});
