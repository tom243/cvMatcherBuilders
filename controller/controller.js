/*jslint node: true */
"use strict";

var utils = require("./../model/utils/utils");
var validation = require("./../model/utils/validation");
var parser = require("../model/builders/parser");

exports.findIfKeyWordsExistsCV = function (req, res) {

    console.log("in findIfKeyWordsExistsCV");
    console.log("body: ", req.body);

    if (validation.cvParser(req)) {

        parser.searchCvWords(req.body.words, req.body.expereince, function (status, results) {
            console.log("results ", results);
            res.status(status).json(results);
        });

    } else {
        utils.sendErrorValidation(res);
    }

};

exports.findIfKeyWordsExistsJOB = function (req, res) {

    console.log("in findIfKeyWordsExistsJOB");
    console.log("body: ", req.body);

    if (validation.jobParser(req)) {

        parser.searchJobWords(req.body.words, req.body.text, function (status, results) {
            res.status(status).json(results);
        });

    } else {
        utils.sendErrorValidation(res);
    }

};