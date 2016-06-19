/*jslint node: true */
"use strict";

/* Common */

function fieldValidation(field, fieldName) {
    var isValid = typeof field !== "undefined" && field !== null;

    if (!isValid) {
        console.log("error in field: " + fieldName);
    }
    return isValid;
}

/* Input types validations */

function validateYear(year) {
    return /^\d{4}$/.test(year);
}

/* Private functions for builders */

function experienceValidation(experience) {

    var valid = experience && experience.constructor === Array;

    if (valid) {
        for (var i = 0; i < experience.length; i++) {
            valid = fieldValidation(experience[i].text, "text") &&
                fieldValidation(experience[i].startdate, "startdate") && validateYear(experience[i].startdate) &&
                fieldValidation(experience[i].enddate, "enddate") && validateYear(experience[i].enddate);
            if (!valid) {
                return false;
            }
        }
        return valid;
    }
    else return false;
}

function wordsValidation(words) {

    var valid = words && words.constructor === Array;

    if (valid) {
        for (var i = 0; i < words.length; i++) {
            valid = fieldValidation(words[i], "word- " + words[i]);
            if (!valid) {
                return false;
            }
        }
        return valid;
    }
    else return false;
}

function textValidation(text) {

    var valid = fieldValidation(text, "text");
    if (!valid) {
        return false;
    }
    return valid;
}

///////////////////////////////// *** Builders Functions *** ///////////////////////////

function CVParser(req) {

    return req.body &&
        experienceValidation(req.body.expereince) &&
        wordsValidation(req.body.words);
}

function JOBParser(req) {

    return req.body &&
        textValidation(req.body.text) &&
        wordsValidation(req.body.words);
}

///////////////////////////////////// *** EXPORTS *** /////////////////////////////////

exports.cvParser = CVParser;
exports.jobParser = JOBParser;