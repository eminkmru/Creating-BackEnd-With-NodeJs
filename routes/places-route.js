const express = require("express");

const HttpError = require("../models/http-error");

const placesControllers = require("../controllers/places-controller");

const router = express.Router();

router.get("/:pid", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlacesByUserid);

router.post("/", placesControllers.createPlace);

router.patch("/:pid", placesControllers.updateById);

router.delete("/:pid", placesControllers.deleteById);

module.exports = router; // export router to be used in app.js
