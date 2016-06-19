var controller = require('./../../controller/controller');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.send("Welcome");
    });

 app.post('/findIfKeyWordsExistsCV', controller.findIfKeyWordsExistsCV);

 app.post('/findIfKeyWordsExistsJOB', controller.findIfKeyWordsExistsJOB);


};


