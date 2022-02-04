const db = require("../models");
const userProjects = db.candidateProjects;

exports.saveProjects = async (req, res) => {
    await userProjects.create(req.body)
        .then(data => {
            res.send(data);
            res.status(200).send({
                message: "Register Successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Something Went wrong while requesting!"
            });
        });
};

exports.showProjects = async (req, res) => {
    await userProjects.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Something Went wrong while requesting!"
            });
        });
};

exports.showProjectsById = async (req, res) => {
    let id = req.params.id
    await userProjects.findOne({ where: { id } })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Something Went wrong while requesting!"
            });
        });


};

exports.deleteProjects = async (req, res) => {
    try {
        let project = await userProjects.findOne({
            where: { id: req.params.id }
        });
        await project.destroy();
        res.status(200).send({ message: "Deleted Successfully!" });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Something Went wrong while requesting!"
        });
    }
};

exports.updateProjects = async (req, res) => {
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
        let project = await userProjects.findOne({
            where: { id: req.params.id }
        });

        project.project_name = project_name;
        project.project_url = project_url;
        project.start_date = start_date;
        project.end_date = end_date;
        project.currently_ongoing = currently_ongoing;
        project.associated_with = associated_with;
        project.description = description;

        await project.save();
        res.status(200).send({ message: "Updated Successfully!" });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Something Went wrong while requesting!"
        });
    }
};