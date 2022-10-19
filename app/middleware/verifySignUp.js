const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Username
    let user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (user) {

  return    res.status(400).json({
        status: 400,
        success: false,
        message: "Failed! Username is already in use!"
      });
    }

    // Email
    user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (user) {
     return res.status(400).json({
        status: 400,
        success: false,
        message: "Failed! Email is already in use!"
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
          status: 500,
          success: false,
          message: error.message
        });
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).json({
          status: 400,
          success: false,
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
