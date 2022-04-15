const express = require("express");
const router = express.Router();

const { getTrack, setTrack } = require("../controllers/musicController");

router.route("/:trackID").get(getTrack);
router.route("/").post(setTrack);

module.exports = router;
