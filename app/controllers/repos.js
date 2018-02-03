var Repo = require('../models/repo');

var ReposController = {
    //get '/'
    index: function(req, res) {
        res.render('index');
    },

    //get '/search'
    search: function(req, res) {
        Repo.search(req.query, function(err, data) {
            res.json(data);
        })
    }
}

module.exports = ReposController;
