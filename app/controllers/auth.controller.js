const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  console.log("Body", req.body);
  // save User to Database
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (req.body.role_id) {
      const roles = await Role.findAll({
        where: {
          id: {
            [Op.eq]: req.body.role_id,
          },
        },
      });

      const result = user.setRoles(roles);
      if (result)
        return res.status(200).json({
          status: 200,
          success: true,
          message: "User registered successfully!"
        });
    } else {
      // user has role = 1
      const result = user.setRoles([1]);
      if (result)
        return res.status(200).json({
          status: 200,
          success: true,
          message: "User registered successfully!"
        });
    }
  } catch (error) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: error.message
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "User Not found."
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(200).json({
        status: 200,
        success: false,
        message: "Invalid Password!"
      });

    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    return res.status(200).json({
      status: 200,
      success: true,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        token: token,
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: error.message
    });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).json({
      status: 200,
      success: true,
      message: "You've been signed out!"
  });
  } catch (err) {
    this.next(err);
  }
};