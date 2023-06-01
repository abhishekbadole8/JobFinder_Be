const express = require("express");
const router = express.Router();
const {
  getJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/").get(getJobs)
router.use(validateToken)

router.route("/add").post(createJob);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;
