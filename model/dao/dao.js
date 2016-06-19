var schemas = require('./../schemas/schemas');

var WordsModel = schemas.WordsModel;
var error = {
    error: null
};

exports.getSynonymsWords =  function (word, callback) {

    var query = WordsModel.find({synonyms:word},{synonyms:1}).limit(1);

    query.exec(function (err, results) {
        if (err) {
            console.log("something went wrong " + err);
            error.error = "something went wrong while trying to get the synonyms words";
            callback(500, error);
        } else {
            if (results.length) {
                callback(200, results[0].synonyms);
            }else {
                callback(200,[word]);
            }
        }
    });
    
};