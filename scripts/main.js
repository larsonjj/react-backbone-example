(function(window) {
'use strict';

var MarvelSearch = {
    Models: {},
    Collections: {},
    Views: {},
    Constants: {
        apiUrl: 'http://gateway.marvel.com/v1/public/characters',
        apiKey: '4c56f6984960e9186514d34a7159b13b'
    }
};

MarvelSearch.Models.Character = Backbone.Model.extend({});

MarvelSearch.Collections.Characters = Backbone.Collection.extend({
    model: MarvelSearch.Models.Character,
    url: MarvelSearch.Constants.apiUrl,
    parse: function(response, options)  {
        return response.data.results;
    }
});

window.MarvelSearch = MarvelSearch;

})(window);
