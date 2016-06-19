/*jslint node: true */
"use strict";

var mongoose = require("mongoose");

module.exports = function () {

    // Build the connection string
    var dbURI = "mongodb://cvmatcher:cvmatcher@ds023593.mlab.com:23593/synonyms_db";

    // Create the database connection
    var db = mongoose.connect(dbURI);

    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on("connected", function () {
        console.log("Mongoose default connection open to " + dbURI);
    });

    // If the connection throws an error
    mongoose.connection.on("error", function (err) {
        console.log("Mongoose default connection error: " + err);
    });

    // When the connection is disconnected
    mongoose.connection.on("disconnected", function () {
        console.log("Mongoose default connection disconnected");
        mongoose.connect(dbURI);
    });

    // If the Node process ends, close the Mongoose connection
    process.on("SIGINT", function () {
        mongoose.connection.close(function () {
            console.log("Mongoose default connection disconnected through app termination");
            process.exit(0);
        });
    });

    return db;
};