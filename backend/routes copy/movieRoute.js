const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");

const { Store, View, trash, update } = require("../controllers/movieController");

router.post("/movie", upload.array("movie_image", 4), Store);
router.get("/movie", View);
router.delete("/movie/:id", trash);
router.patch("/movie", upload.array("movie_image", 4), update);

module.exports = router;
