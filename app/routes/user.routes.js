const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const educationController = require("../controllers/user.education.controller");
const projectsController = require("../controllers/user.projects.controller");
const skillsController = require("../controllers/user.skills.controller");
const languagesController = require("../controllers/user.languages.controller");
const experienceController = require("../controllers/user.experience.controller");
const { isCandidate } = require("../middleware/authJwt");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/user/profile/create", [authJwt.verifyToken], controller.createUpdate);
  app.get("/api/user/profile/getOne", [authJwt.verifyToken], controller.getUserById);
  app.get("/api/user/profile/getAll", [authJwt.verifyToken], controller.getAllUsers);
  app.get("/api/user/profile/delete", [authJwt.verifyToken], controller.deleteUserProfile);
  

  //Education
  app.post("/api/user/education/create", [authJwt.verifyToken,authJwt.isCandidate], educationController.saveEducation);
  app.get("/api/user/education/getOne", [authJwt.verifyToken], educationController.showEducationById);
  app.get("/api/user/education/getAll", [authJwt.verifyToken], educationController.showAllEducations);
  app.delete("/api/user/education/delete", [authJwt.verifyToken], educationController.deleteEducation);
  app.put("/api/user/education/update", [authJwt.verifyToken], educationController.updateEducation);


  //projects
  app.post("/api/user/projects/create", [authJwt.verifyToken,authJwt.isCandidate], projectsController.saveProjects);
  app.get("/api/user/projects/getOne", [authJwt.verifyToken], projectsController.showProjectById);
  app.get("/api/user/projects/getAll", [authJwt.verifyToken], projectsController.showAllProjects);
  app.delete("/api/user/projects/delete", [authJwt.verifyToken], projectsController.deleteProjects);
  app.put("/api/user/projects/update", [authJwt.verifyToken], projectsController.updateProjects);

  //skills
  app.post("/api/user/skills/create", [authJwt.verifyToken,authJwt.isCandidate], skillsController.saveSkills);
  app.get("/api/user/skills/getOne", [authJwt.verifyToken], skillsController.showSkillById);
  app.get("/api/user/skills/getAll", [authJwt.verifyToken], skillsController.showAllSkills);
  app.delete("/api/user/skills/delete", [authJwt.verifyToken], skillsController.deleteSkills);
  app.put("/api/user/skills/update", [authJwt.verifyToken], skillsController.updateSkills);

  //languages
  app.post("/api/user/languages/create", [authJwt.verifyToken,authJwt.isCandidate], languagesController.saveLanguages);
  app.get("/api/user/languages/getOne", [authJwt.verifyToken], languagesController.showLanguageById);
  app.get("/api/user/languages/getAll", [authJwt.verifyToken], languagesController.showAllLanguages);
  app.delete("/api/user/languages/delete", [authJwt.verifyToken], languagesController.deleteLanguages);
  app.put("/api/user/languages/update", [authJwt.verifyToken], languagesController.updateLanguages);

  // User Experience
  app.post("/api/user/experience/create", [authJwt.verifyToken,authJwt.isCandidate], experienceController.saveExperience);
  app.get("/api/user/experience/getOne", [authJwt.verifyToken], experienceController.showExperienceById);
  app.get("/api/user/experience/getAll", [authJwt.verifyToken], experienceController.showAllExperiences);
  app.delete("/api/user/experience/delete", [authJwt.verifyToken], experienceController.deleteExperience);
  app.put("/api/user/experience/update", [authJwt.verifyToken], experienceController.updateExperience);

  //aws s3
  app.post("/api/imageUpload", controller.imageUpload);

  
};
