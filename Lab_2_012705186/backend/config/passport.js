'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
// var db = require('../app/db');
const Users = require('../models/users');
var config = require('./settings');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        Users.findUser({user: jwt_payload.username}, function (res) {
            var user = res;
            delete user.password;
            callback(null, user);
        }, function (err) {
            return callback(err, false);
        });
    }));
};