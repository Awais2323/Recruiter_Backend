const db = require("../models");
const employerProfile = db.employerInfo;
const companyProfile = db.companyProfile;


exports.saveEmployerProfile = async (req, res) => {
    const employerId = req.userId;

    const profile = await employerProfile.findOne({
        where: {
            employerId
        },
    });

    if (!profile) {

        employerProfile.create(req.body)
        .then(data => {
          res.status(200).json({
            status: 200,
            success: false,
            message: "Created Successfully!",
            data: data
          });
        })
        .catch(err => {
          res.status(500).json({
            status: 500,
            success: false,
            message: err.message || "Some error occurred while creating."
          });
        });
    } else {
      employerProfile.update(req.body, {
        where: { employerId }
      }).then(num => {
        if (num == 1) {
          res.status(200).json({
            status: 200,
            success: false,
            message: "Updated Successfully"
          });
        } else {
          res.status(500).json({
            status: 500,
            success: false,
            message: "No changes were made!"
          });
        }
      })
        .catch(err => {
          res.status(500).json({
            status: 500,
            success: false,
            message: "Error updating with id=" + req.userId
          });
        });
    }

};

exports.showAllEmployerProfiles = async (req, res) => {
    const employerId = req.userId;

    if (!employerId) {
        res.status(403).json({
            status: 403,
            success: false,
            message: "Unauthorize"
        });
    } else {
        await employerProfile.findAll({
            where: { employerId }
        })
            .then(data => {
                res.status(200).json({
                    status: 200,
                    success: true,
                    data: data
                });
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    success: false,
                    message: err.message || "Something Went wrong while requesting!"
                });
            });
    }
};

exports.showEmployerProfileById = async (req, res) => {
    const employerId = req.userId;

    if (!employerId) {
        res.status(403).json({
            status: 403,
            success: false,
            message: "Unauthorize"
        });
    } else {
        await employerProfile.findOne({
            where: {  employerId }
        })
            .then(data => {
                res.status(200).json({
                    status: 200,
                    success: true,
                    data: data
                });
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    success: false,
                    message: err.message || "Something Went wrong while requesting!"
                });
            });
    }
};

exports.deleteEmployerProfile = async (req, res) => {
    const id = req.query.id;
    const employerId = req.employerId;

        
    
    try {
        const company = await companyProfile.findAll({
            where: { employerId },
          });
          if(company.length>0){
      
            await company.map((company) => company.destroy());
          }
        const employer = await employerProfile.findOne({
            where: { id }
        });
        await employer.destroy().then(data => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Deleted Successfully",
                data: data
            });
        }).catch(err => {
            res.status(500).json({
                status: 500,
                success: false,
                message: err.message || "Something Went wrong while requesting!"
            });
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            success: false,
            message: err.message || "Something Went wrong while requesting!"
        });
    }
};

exports.updateEmployerProfile = async (req, res) => {
    const id = req.query.id;
    const employerId = req.userId;
    const {
        full_name,
        job_designation,
        gender,
        dob,
        office_number,
        mobile_number,
        avatar
    } = req.body;

    try {
        const employer = await employerProfile.findOne({
            where: { id, employerId }
        });

        employer.full_name = full_name;
        employer.job_designation = job_designation;
        employer.gender = gender;
        employer.dob = dob;
        employer.office_number = office_number;
        employer.mobile_number = mobile_number;
        employer.avatar = avatar;

        await employer.save().then(data => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Updated Successfully",
                data: data
            });
        })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    success: false,
                    message: err.message || "Something Went wrong while requesting!"
                });
            });
    } catch (err) {
        res.status(500).json({
            status: 500,
            success: false,
            message: err.message || "Something Went wrong while requesting!"
        });
    }
};