const db = require("../models");
// const S3Service = require("../services/s3service");
const path = require("path");
const CandidateProfile = db.candidateProfile;
const candidateEducation = db.candidateEducation;
const candidateExperience = db.candidateExperience;
const candidateProjects = db.candidateProjects;
const candidateSkills = db.candidateSkills;
const candidateLanguages = db.candidateLanguages;
const { v4: uuidv4 } = require("uuid");
const BUCKET = "recruiter-profile-picture";
const Op = db.Sequelize.Op;

// Create and Save a new Candidate
exports.createUpdate = async (req, res) => {
  //checkProfile
  const profile = await CandidateProfile.findOne({
    where: {
      userId: req.userId,
    },
  });

  if (!profile) {
    CandidateProfile.create(req.body)
      .then((data) => {
        res.status(200).json({
          status: 200,
          success: false,
          message: "Created Successfully!",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: 500,
          success: false,
          message: err.message || "Some error occurred while creating.",
        });
      });
  } else {
    CandidateProfile.update(req.body, {
      where: { userId: req.userId },
    })
      .then((num) => {
        if (num == 1) {
          res.status(200).json({
            status: 200,
            success: false,
            message: "Updated Successfully",
          });
        } else {
          res.status(500).json({
            status: 500,
            success: false,
            message: "No changes were made!",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          status: 500,
          success: false,
          message: "Error updating with id=" + req.userId,
        });
      });
  }
};

exports.getUserById = async (req, res) => {
  const id = req.query.id;
  const userId = req.userId;

  try {
    const profile = await CandidateProfile.findOne({
      where: { id, userId },
    });

    const education = await candidateEducation.findAll({
      where: { userId },
    });

    const experience = await candidateExperience.findAll({
      where: { userId },
    });

    const projects = await candidateProjects.findAll({
      where: { userId },
    });

    const skills = await candidateSkills.findAll({
      where: { userId },
    });

    const languages = await candidateLanguages.findAll({
      where: { userId },
    });

    if (!profile && !education && !projects && !skills && !languages) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "cannot find user",
      });
    } else {
      res.status(200).json({
        status: 200,
        success: true,
        data: [
          { profile },
          { education },
          { experience },
          { projects },
          { skills },
          { languages },
        ],
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: err.message || "Something Went wrong while requesting!",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  const userId = req.userId;

  try {
    const profile = await CandidateProfile.findAll({
      where: { userId },
    });

    const education = await candidateEducation.findAll({
      where: { userId },
    });

    const experience = await candidateExperience.findAll({
      where: { userId },
    });

    const projects = await candidateProjects.findAll({
      where: { userId },
    });

    const skills = await candidateSkills.findAll({
      where: { userId },
    });

    const languages = await candidateLanguages.findAll({
      where: { userId },
    });

    if (!profile && !education && !projects && !skills && !languages) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "cannot find user",
      });
    } else {
      res.status(200).json({
        status: 200,
        success: true,
        data: [
          { profile },
          { education },
          { experience },
          { projects },
          { skills },
          { languages },
        ],
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: err.message || "Something Went wrong while requesting!",
    });
  }
};
exports.deleteUserProfile = async (req, res) => {
  const id = req.query.id;
  const userId = req.query.userId;
  try {
    const education = await userEducation.findOne({
      where: { id, userId },
    });
    education.destroy();
    const employer = await employerProfile.findOne({
      where: { id },
    });
    employer.destroy();
    const language = await userLanguages.findOne({
      where: { id, userId },
    });
    language.destroy();
    const project = await userProjects.findOne({
      where: { id, userId },
    });
    project.destroy();
    const skill = await userSkills.findOne({
      where: { id, userId },
    });
    skill.destroy();

    const candidate = await CandidateProfile.findOne({
      where: { id },
    });
    await candidate
      .destroy()
      .then((data) => {
        res.status(200).json({
          status: 200,
          success: true,
          message: "Deleted Successfully",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: 500,
          success: false,
          message: err.message || "Something Went wrong while requesting!",
        });
      });
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: err.message || "Something Went wrong while requesting!",
    });
  }
};

exports.imageUpload = async (req, res) => {
  const payload = req.body;
  // console.log("payload",req.body)
  let image = {};
  let buffer = Buffer.from(
    payload.file.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  image["key"] = uuidv4();
  image["file"] = buffer;
  image["type"] = path.extname(payload.fileName);
  image["mime"] = payload.mime;
  if (BUCKET) {
    const responseUrl = await uploadImage(image, BUCKET).catch((err) => {
      return res.status(500).json({
        status: 500,
        success: false,
        message: err.message || err.message,
      });
    });

    if (!responseUrl)
      res.status(500).json({
        status: 500,
        success: false,
        message: err.message || "Can not upload Image.",
      });
    console.log("url2233", responseUrl);

    // const resp = await AddCardImage({ ...item, image_url: `${responseUrl}` });
    // res.status(200).json({
    //   status: 200,
    //   success: true,})
  } else
    return res.status(500).json({
      status: 500,
      success: false,
      message: err.message || "Can not upload Image.",
    });
  // const files = req.file;

  //   try {
  //       if (files) {
  //         await S3Service.uploadFiles(files[0], 'Image', function (result) {
  //               res.status(result.status).json(result.body);
  //           });
  //       } else {
  //           res.status(400).json({
  //               message: 'Wrong request Body format or there no files to upload'
  //           });
  //       }
  //   } catch (error) {
  //       res.status(500).json({
  //           message: error
  //       });
  //   }
};
