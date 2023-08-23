const express = require("express");
const bodyParser = require("body-parser");
const placesRoutes = require("./routes/places-route");
const HttpError = require("./models/http-error");

const app = express(); // create express app

app.use(bodyParser.json()); // parse incoming json data

app.use("/api/places", placesRoutes); // register placesRoutes as middleware

// Error handling middleware
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error; // forward error request
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(5000); // listen for incoming requests
