const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");

const app = express();
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const maisonRouter = require("./routes/maison.route");
const reservationRouter = require("./routes/reservation.route");

app.use(cors());

app.use(logger("dev"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", indexRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/maisons", maisonRouter);
app.use("/api/v1/reservations", reservationRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

// CORS HEADERS MIDDELWARE
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error
  res.status(err.status || 500);
  res.json({
    error: "error server code:500",
  });
});

module.exports = app;
