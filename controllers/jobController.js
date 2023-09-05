const Job = require("../module/jobSchema");

//@desc Get user created Jobs
//@route GET api/job
//@access public
const getJobs = async (req, res) => {
  try {
    const { skills } = req.query;
    let query = {};

    if (skills) {
      query.skills = { $all: skills.split(",") };
    }

    const jobs = await Job.find(query);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//@desc Here user create Job
//@route POST api/job/add
//@access private
const createJob = async (req, res) => {
  try {
    const {
      company_name,
      logo_url,
      job_position,
      monthly_salary,
      job_type,
      remote_office,
      location,
      job_description,
      about_company,
      skills,
    } = req.body;

    if (
      !company_name ||
      !logo_url ||
      !job_position ||
      !monthly_salary ||
      !job_type ||
      !remote_office ||
      !location ||
      !job_description ||
      !about_company ||
      !skills
    ) {
      return res.status(400).json({ message: "All field's are Mandatory!" });
    }

    const job = await Job.create({
      user_id: req.id,
      company_name,
      logo_url,
      job_position,
      monthly_salary,
      job_type,
      remote_office,
      location,
      job_description,
      about_company,
      skills,
    });
    res.status(200).json({ message: "Job added Successfully!!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//@desc user created Job here
//@route POST api/jobs/:id
//@access public
const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found!!" });
    }
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//@desc user EDIT created Job here
//@route PATCH api/jobs/:id
//@access public
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found!!" });
    }
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//@desc user DELETE created Job here
//@route DELETE api/jobs/:id
//@access public
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found!!" });
    }
    await Job.findByIdAndDelete({ _id: req.params.id });
    await res.status(200).json({ message: "Deleted Successfully!!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getJobs, createJob, getJob, updateJob, deleteJob };
