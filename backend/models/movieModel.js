const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    category: { type: String, trim: true, required: true },
    title: { type: String, trim: true, required: true },

    description: { type: String, trim: true },
    director: { type: String, trim: true },
    language: { type: String, trim: true },

    releaseYear: { type: Number },
    rating: { type: Number, min: 0, max: 10 },

    movie_image: { type: [String] },
  },
  { timestamps: true }
);

module.exports = model("Movie", movieSchema);
