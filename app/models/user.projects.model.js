module.exports = (sequelize, Sequelize) => {
    const CandidateProjects = sequelize.define(
        "candidate_projects", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        project_name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a field of project name' },
                notEmpty: { msg: 'project name must not be empty' }
            }
        },
        project_url: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a project url' },
                notEmpty: { msg: 'project url must not be empty' }
            }
        },
        start_date: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a starting' },
                notEmpty: { msg: 'there must be a starting date' }
            }
        },
        end_date: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have an ending date' },
                notEmpty: { msg: 'there must be an end date' }
            }
        },
        currently_ongoing: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: { msg: 'must tell if project is currently ongoing' },
                notEmpty: { msg: 'currently ongoing must not be empty' }
            }
        },
        associated_with: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a associated_with' },
                notEmpty: { msg: 'association must not be empty' }
            }
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a description' },
                notEmpty: { msg: 'description must not be empty' }
            }
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
    );

    return CandidateProjects;
};