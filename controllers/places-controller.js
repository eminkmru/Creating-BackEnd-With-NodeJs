const HttpError = require("../models/http-error");

const { v4: uuid } = require("uuid");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u2",
  },
  {
    id: "p3",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u2",
  },
];

const getPlaceById = (req, res, next) => {
  const placedId = req.params.pid; // { pid: 'p1' }
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placedId;
  });

  if (!place || place.length === 0) {
    throw new HttpError("Could not find a place for the provided id.", 404); // throw error to be handled by error handling middleware
  }
  res.json({ place }); // { place }  => { place: place }
};

const getPlacesByUserid = (req, res, next) => {
  const userId = req.params.uid; // { uid: 'u1' }
  const place = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });

  if (!place) {
    const error = new Error();
    return next(
      new HttpError("Could not find a place for the provided user id.", 404)
    ); // return error to be handled by error handling middleware
  }
  res.json({ place }); // { place }  => { place: place }
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body; // destructure req.body
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPlace); // push createdPlace to DUMMY_PLACES
  res.status(201).json({ place: createdPlace }); // respond with createdPlace
};

const updateById = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;
  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;
  DUMMY_PLACES[placeIndex] = updatedPlace;
  res.status(200).json({ place: updatedPlace });
};

const deleteById = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserid = getPlacesByUserid;
exports.createPlace = createPlace;
exports.updateById = updateById;
exports.deleteById = deleteById;
