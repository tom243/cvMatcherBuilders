exports.sendErrorValidation = function (res) {
    var error = {
        error: "the value of fields is incorrect or undefined"
    };
    console.log(error.error);
    res.status(400).json(error);
};

if(!Array.prototype.sum) { // expand Array class and add sum function
    Array.prototype.sum = function () {
        var sum = 0;
        this.forEach(function(current) { 
            sum += current;
        });
        return sum;
    }
}