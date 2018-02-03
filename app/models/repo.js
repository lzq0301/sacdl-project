var GitHubApi = require("github");

/**
 * from https://www.npmjs.com/package/github
 * @type {GitHubApi}
 */
var github = new GitHubApi({
    // required 
    version: "3.0.0",
    // optional 
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub 
    pathPrefix: "", // for some GHEs; none for GitHub 
    timeout: 5000,
    headers: {
        "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent 
    }
});

var Repo = {
    /**
     * [search repos from github.com]
     * @param  {[type]}   msg      query string
     * @param  {Function} callback 
     * @return {[type]}            [void]
     */
    search: function(msg, callback) {
        // var msg = msg || {
        //     q: 'bitcoin',
        //     sort: 'forks',
        //     order: 'desc',
        //     per_page: 100
        // }
        var msg = Object.assign({
                    q: 'bitcoin',
                    sort: 'forks',
                    order: 'desc',
                    per_page: 100
                }, msg);
        github.search.repos(msg, function (err, data) {
            if (err) {return console.log(err)};
            var dataSet = treeData(data);
            callback(null, dataSet);
        });
    }
}

// from /public/js/utils.js
function treeData(dataSet) {
    var languages = {};
    // languages[]'s index and also the language object index of result.children[]
    var languagesIndex = 0;
    var result = {
        "name": "languages",
        "children": []
    }

    if (dataSet && dataSet.items) {
        var items = dataSet.items;
       
        items.forEach(function(item, index) {
            var child = {
                "name": item.full_name,
                "watchers_count": item.watchers_count,
                "forks_count": item.forks_count
            };
            // current item language when null set name 'others'
            var currentLanguage = item.language=="null"?"others":item.language;
            if (typeof languages[currentLanguage] === "undefined") {
                languages[currentLanguage] = languagesIndex++;
                var root = {
                    "name": currentLanguage,
                    "children": []
                };
                result.children.push(root);
                
            }
            result.children[languages[currentLanguage]].children.push(child);
         })

        // for (var language in languages) {
        //     if (language === "null") {
        //         language = "others";
        //     };

        //     var root = {
        //         "name": language,
        //         "children": []
        //     };

        //     items.forEach(function(item, index) {
        //         var child = {
        //             "name": item.full_name,
        //             "watchers_count": item.watchers_count,
        //             "forks_count": item.forks_count
        //         };

        //         if (item.language === language || (item.language === "null" && language === "others")) {
        //             root.children.push(child);
        //         };
        //     })

        //     result.children.push(root);
        // }
    }

    return result;
}

module.exports = Repo;
