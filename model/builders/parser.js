/*jslint node: true */
"use strict";

var async = require("async");
var dao = require("../dao/dao");

function removeInvalidCharacters(data) {

    return data.toLocaleLowerCase().replace(/[\u2022,\u2023,\u25E6,\u2043,\u2219\/\\,()\r\n$~%.!'":*?<>{}]/g, ' ').split(" ");
}


exports.searchJobWords = function (words, data, callback) {

    var results = [];
    var keyWordsIndex;
    var text = removeInvalidCharacters(data); // remove invalid characters
    var match = true;
    var keyWordArr = [];
    var exists;

    console.log("text" + text);
    // 1st para in async.each() is the array of items
    async.each(words,
        // 2nd param is the function that each item is passed to
        function (word, callbackAsync) {
            // Call an asynchronous function

            dao.getSynonymsWords(word, function (status, synonymsKeyWords) {
                if (status === 200) {
                    for (keyWordsIndex = 0; keyWordsIndex < synonymsKeyWords.length; keyWordsIndex++) {
                        keyWordArr = synonymsKeyWords[keyWordsIndex].split(" ");
                        exists = text.indexOf(keyWordArr[0]);
                        if (exists !== -1) { // filters by keywords
                            if (keyWordArr.length > 1) {
                                console.log("keyWordArr" + keyWordArr);
                                for (var i = 1; i < keyWordArr.length; i++) {
                                    if (keyWordArr[i] !== text[exists + i]) {
                                        match = false;
                                    }
                                }
                            }
                            if (match) {
                                results.push(word);
                                break;
                            }
                        }
                    }
                    match = true;
                    callbackAsync();
                } else {
                    return new Error("error in get data from db");
                }
            });

        },
        // 3rd param is the function to call when everything is done
        function (err) {
            // All tasks are done now
            if (err === null) {
                callback(200, results);
            } else {
                callback(500, results);
            }
        }
    );

};

exports.searchCvWords = function (words, data, callback) {

    var yearsArr;
    var results = [];
    var keyWordsIndex;
    var match = true;
    var keyWordArr = [];
    var exists;

    // 1st para in async.each() is the array of items
    async.each(words,
        // 2nd param is the function that each item is passed to
        function (word, callbackAsync) {
            // Call an asynchronous function

            dao.getSynonymsWords(word, function (status, synonymsKeyWords) {
                if (status === 200) {

                    yearsArr = data.filter(function (exp) {

                        var text = removeInvalidCharacters(exp.text); // remove invalid characters
                        for (keyWordsIndex = 0; keyWordsIndex < synonymsKeyWords.length; keyWordsIndex++) {
                            keyWordArr = synonymsKeyWords[keyWordsIndex].split(" ");
                            exists = text.indexOf(keyWordArr[0]);
                            if (exists !== -1) { // filters by keywords
                                if (keyWordArr.length > 1) {
                                    console.log("keyWordArr" + keyWordArr);
                                    for (var i = 1; i < keyWordArr.length; i++) {
                                        if (keyWordArr[i] !== text[exists + i]) {
                                            match = false;
                                        }
                                    }
                                }
                                if (match) {
                                    return true;
                                }
                            }
                        }
                        return false; // if key word not found
                    }).map(function (exp) { // attach the years to the found word
                        return exp.enddate - exp.startdate;
                    });

                    if (yearsArr.length) {
                        results.push({
                            name: word,
                            years: yearsArr.sum() // sum the years and return the result
                        });
                    }
                    match = true;
                    callbackAsync();
                } else {
                    return new Error("error in get data from db");
                }
            });

        },
        // 3rd param is the function to call when everything is done
        function (err) {
            // All tasks are done now
            if (err === null) {
                callback(200, results);
            } else {
                callback(500, results);
            }
        }
    );

};