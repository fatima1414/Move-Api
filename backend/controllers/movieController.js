const Movie = require("../models/movieModel");
const fs = require("fs");
const path = require("path");

// CREATE
exports.Store = async (req, res) => {
  const {
    category,
    title,
    description,
    director,
    language,
    releaseYear,
    rating,
  } = req.body;

  const images = req.files?.map((f) => f.filename) || [];

  await Movie.create({
    category,
    title,
    description,
    director,
    language,
    releaseYear,
    rating,
    movie_image: images,
  });

  res.json({ success: true, message: "Movie Added" });
};

// READ
exports.View = async (req, res) => {
  const records = await Movie.find();
  res.json({ success: true, records });
};

// DELETE
exports.trash = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.json({ success: false });

  movie.movie_image.forEach((img) => {
    const imgPath = path.join(__dirname, "../uploads", img);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  });

  await Movie.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Movie Deleted" });
};

// UPDATE
exports.update = async (req, res) => {
  const { id } = req.query;
  const movie = await Movie.findById(id);
  if (!movie) return res.json({ success: false });

  let images = movie.movie_image;
  if (req.files && req.files.length > 0) {
    images.forEach((img) => {
      const imgPath = path.join(__dirname, "../uploads", img);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    });
    images = req.files.map((f) => f.filename);
  }

  await Movie.findByIdAndUpdate(id, {
    ...req.body,
    movie_image: images,
  });

  res.json({ success: true, message: "Movie Updated" });
};
