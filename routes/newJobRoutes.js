const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const {
  getJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

router.get("/", getJobs);
router.post("/add", validateToken, createJob);
router
  .route("/:id")
  .get(validateToken, getJob)
  .patch(validateToken, updateJob)
  .delete(validateToken, deleteJob);

module.exports = router;
