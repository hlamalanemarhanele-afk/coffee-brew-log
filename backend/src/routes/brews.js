const express = require("express");
const {
  listBrews,
  createBrew,
  updateBrew,
  deleteBrew,
} = require("../controllers/brewsController");

const router = express.Router();

router.get("/", listBrews);
router.post("/", createBrew);
router.put("/:id", updateBrew);
router.delete("/:id", deleteBrew);

module.exports = router;