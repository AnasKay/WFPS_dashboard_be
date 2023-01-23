const jwt = require("jsonwebtoken")
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isOps = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "ops") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Ops Role!"
      });
      return;
    });
  });
};

isInf = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "inf") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Inf Role!"
      });
    });
  });
};

isDevOps = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "devops") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require DevOps Role!"
      });
      return;
    });
  });
};

isOpsOrInf = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "ops") {
          next();
          return;
        }

        if (roles[i].name === "inf") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Ops or Inf Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isOps: isOps,
  isInf: isInf,
  isDevOps: isDevOps,
  isOpsOrInf: isOpsOrInf
};
module.exports = authJwt;

