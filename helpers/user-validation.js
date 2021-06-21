var jwt = require('jsonwebtoken');
var secretKey = require('../config/credentials').secret_key;
module.exports = {
    validateUser: async function (req, res, next) {
        await jwt.verify(req.headers['x-access-token'], secretKey, function (err, decoded) {
            if (err) {
                res.json({
                    status: "error",
                    message: err.message,
                    data: null
                });
            } else {
                // add user id to request
                req.body.logged={
                    userid : decoded.id,
                    email : decoded.email,
                    role : decoded.role,
                }
                next();
            }
        });
    },
    isAdmin: async function (req, res, next) {
        if (req.body.logged.role !== "ADMIN") {
            res.json({
                status: "error",
                message: "error You are not allowed You are not Administrator",
                payload: null
            });
        } else {
            next();
        }
    },
    
  PROVIDER: async function (req, res, next) {
        if (req.body.logged.role !== "PROVIDER") {
            res.json({
                status: "error",
                message: "error You are not allowed You are not PROVIDER",
                payload: null
            });
        } else {
            next();
        }
    },
   STUDENT: async function (req, res, next) {
        if (req.body.logged.role !== "STUDENT") {
            res.json({
                status: "error",
                message: "error You are not allowed You are not STUDENT",
                payload: null
            });
        } else {
            next();
        }
    },
    roles: {
        admin: "ADMIN",
        guest: "GUEST",
        user: "USER",
        student: "STUDENT",
        provider: "PROVIDER"

    }
}

// ACCESS CNTROL LEVEL