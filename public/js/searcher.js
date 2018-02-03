var Searcher = (function() {
    var url = '',
        crlUrl = '',
        baseApiUrl,
        baseCrlUrl,
        inputTxt,
        searchBtn,
        searchMsg,
        listeners = [],
        query = {
            q: 'bitcoin',
            sort: "forks",
            order: "desc",
            per_page: 100
        };

    return {
        settings: {
            baseApiUrl: 'https://api.github.com/search/repositories',
            baseCrlUrl:'http://localhost:3000/search'
        },

        init: function() {
            inputTxt = d3.select('#search-input');
            searchBtn = d3.select('#search-btn');
            searchMsg = d3.select('#search-msg')

            baseApiUrl = this.settings.baseApiUrl;
            baseCrlUrl = this.settings.baseCrlUrl;

            searchBtn.on('click', function() {
                parseQuery();
                listeners.forEach(function(listener) {
                    try {
                        listener(crlUrl);
                    } catch (error) {
                        console.log(error);
                    }
                })
            })
        },

        addListener: function(listener) {
            //listeners.push(listener);
            listeners = [listener];
        }
    };

    function parseQuery() {
        query.q = inputTxt.property('value') || 'bitcoin';
        var arr = [];

        for (var key in query) {
            arr.push(key + '=' + query[key]);
        };

        url = baseApiUrl + '?' + arr.join('&');
        crlUrl = baseCrlUrl + '?' + arr.join('&');
        console.log(url);
        searchMsg.text('当前搜索地址: ' + url);
        return url;
    }
}())
