const db = require("../models");
const employerProfile = db.employerInfo;

exports.saveEmployerProfile = async (req, res) => {
    await employerProfile.create(req.body)
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
    const id = req.query.id;
    const employerId = req.userId;

    if (!employerId) {
        res.status(403).json({
            status: 403,
            success: false,
            message: "Unauthorize"
        });
    } else {
        await employerProfile.findOne({
            where: { id, employerId }
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
    const employerId = req.userId;
    try {
        const employer = await employerProfile.findOne({
            where: { id, employerId }
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