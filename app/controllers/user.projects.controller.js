const db = require("../models");
const userProjects = db.candidateProjects;

exports.saveProjects = async (req, res) => {
    await userProjects.create(req.body)
    .then(data => {
        res.status(200).json({
            status: 200,
            success: true,
            message: "Created Successfully",
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


exports.showAllProjects = async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        res.status(403).json({
            status: 403,
            success: false,
            message: "Unauthorize"
        });
    } else {
        await userProjects.findAll({
            where: { userId }
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

exports.showProjectById = async (req, res) => {
    const id = req.query.id;
    const userId = req.query.userId;

    if (!userId) {
        res.status(403).json({
            status: 403,
            success: false,
            message: "Unauthorize"
        });
    } else {
        await userProjects.findOne({
            where: { id, userId }
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

exports.deleteProjects = async (req, res) => {
    const id = req.query.id;
    const userId = req.query.userId;
    
    try {
        const project = await userProjects.findOne({
            where: { id, userId }
        });
        await project.destroy().then(data => {
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

exports.updateProjects = async (req, res) => {
    const id = req.query.id;
    const userId = req.query.userId;
    console.log(userId);
    const {
        project_name,
        project_url,
        start_date,
        end_date,
        currently_ongoing,
        associated_with,
        description
    } = req.body;

    try {
        const project = await userProjects.findOne({
            where: { id, userId }
        });

        project.project_name = project_name;
        project.project_url = project_url;
        project.start_date = start_date;
        project.end_date = end_date;
        project.currently_ongoing = currently_ongoing;
        project.associated_with = associated_with;
        project.description = description;

        await project.save().then(data => {
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