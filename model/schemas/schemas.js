/**
 * Created by Tomer on 6/15/2016.
 */

/*jslint node: true */
"use strict";

var mongoose = require("mongoose");

var words_schema = mongoose.Schema;

// historyTimeline Schema
var wordsSchema = new words_schema({

    synonyms: [String]

}, {collection: "SynonymsKeyWords"});

exports.WordsModel = mongoose.model("wordsModel", wordsSchema);