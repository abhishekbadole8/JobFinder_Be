
const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  logo_url: {
    type: String,
    required: true,
  },
  job_position: {
    type: String,
    required: true,
  },
  monthly_salary: {
    type: String,
    required: true,
  },
  job_type: {
    type: String,
    required: true,
  },
  remote_office: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  job_description: {
    type: String,
    required: true,
  },
  about_company: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
});

const JOB = mongoose.model("JOB", jobSchema);
module.exports = JOB;
