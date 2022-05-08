const express = require("express");
const router = express.Router();

const {
  getList,
  getOne,
  addList,
  updateList,
  deleteList,
} = require("../controllers/journalController");

router.route("/:username").get(getList);
router.route("/id/:id").get(getOne);
router.route("/new").post(addList);
router.route("/update").put(updateList);
router.route("/delete").delete(deleteList);

module.exports = router;
