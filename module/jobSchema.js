const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
      type: Array,
      default:[],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("JOB", jobSchema);
module.exports = Job;
