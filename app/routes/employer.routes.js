const { authJwt } = require("../middleware");
const employerProfileController = require("../controllers/employer.controller");
const companyController = require("../controllers/company.controller");
const jobPostController = require("../controllers/job.post.controller");
const jobLocationController = require("../controllers/job.location.controller");
const jobSkillsController = require("../controllers/job.skills.controller");


module.exports = function (app) {
    //     app.use(function (req, res, next) {
    //         res.header(
    //             "Access-Control-Allow-Headers",
    //             "Origin, Content-Type, Accept"
    //         );
    //         next();
    //     });

    //employer
    app.post("/api/employer/profile/create", [authJwt.verifyToken,authJwt.isEmployer], employerProfileController.saveEmployerProfile);
    app.get("/api/employer/profile/getOne", [authJwt.verifyToken,authJwt.isEmployer], employerProfileController.showEmployerProfileById);
    app.get("/api/employer/profile/getAll", [authJwt.verifyToken,authJwt.isEmployer], employerProfileController.showAllEmployerProfiles);
    app.delete("/api/employer/profile/delete", [authJwt.verifyToken,authJwt.isEmployerOrAdmin], employerProfileController.deleteEmployerProfile);
    app.put("/api/employer/profile/update", [authJwt.verifyToken,authJwt.isEmployer], employerProfileController.updateEmployerProfile);

    //company
    app.post("/api/employer/company/create", [authJwt.verifyToken], companyController.saveCompany);
    app.get("/api/employer/company/getOne", [authJwt.verifyToken], companyController.showCompanyById);
    app.get("/api/employer/company/getAll", [authJwt.verifyToken], companyController.showAllCompanys);
    app.delete("/api/employer/company/delete", [authJwt.verifyToken], companyController.deleteCompany);
    app.put("/api/employer/company/update", [authJwt.verifyToken], companyController.updateCompany);

    //job post
    app.post("/api/employer/job/create", [authJwt.verifyToken,authJwt.isEmployer], jobPostController.saveJob);
    app.get("/api/employer/job/getOne", [authJwt.verifyToken], jobPostController.showJobById);
    app.get("/api/employer/job/getAll", [authJwt.verifyToken], jobPostController.showAllJobs);
    app.delete("/api/employer/job/delete", [authJwt.verifyToken], jobPostController.deleteJob);
    app.put("/api/employer/job/update", [authJwt.verifyToken], jobPostController.updateJob);

    //job location
    app.post("/api/employer/jobLocation/create", [authJwt.verifyToken], jobLocationController.saveJobLocation);
    app.get("/api/employer/jobLocation/getOne", [authJwt.verifyToken], jobLocationController.showJobLocationById);
    app.get("/api/employer/jobLocation/getAll", [authJwt.verifyToken], jobLocationController.showAllJobLocations);
    app.delete("/api/employer/jobLocation/delete", [authJwt.verifyToken], jobLocationController.deleteJobLocation);
    app.put("/api/employer/jobLocation/update", [authJwt.verifyToken], jobLocationController.updateJobLocation);

    //job skills
    app.post("/api/employer/jobSkills/create", [authJwt.verifyToken], jobSkillsController.saveJobSkills);
    app.get("/api/employer/jobSkills/getOne", [authJwt.verifyToken], jobSkillsController.showJobSkillsById);
    app.get("/api/employer/jobSkills/getAll", [authJwt.verifyToken], jobSkillsController.showAllJobSkills);
    app.delete("/api/employer/jobSkills/delete", [authJwt.verifyToken], jobSkillsController.deleteJobSkills);
    app.put("/api/employer/jobSkills/update", [authJwt.verifyToken], jobSkillsController.updateJobSkills);

};