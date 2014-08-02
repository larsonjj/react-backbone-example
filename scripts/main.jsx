/** @jsx React.DOM */

(function(window) {

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
})

MarvelSearch.Views.SearchBox = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var query = this.refs.searchInput.getDOMNode().value;
        this.props.onUserSubmit(query);
    },
    render: function() {
        return (
            <div className="search-box-wrapper">
                <form id="character-search-form">
                    <input ref="searchInput" type="text" name="search" placeholder="Search" />
                    <button className="search-button" onClick={this.handleSubmit}><i className="fa fa-search"></i></button>
                </form>
            </div>
        );
    }
});

MarvelSearch.Views.CharacterListItem = React.createClass({
    render: function() {
        return (
            <li className="character-list-item">
                <h2>{this.props.data.name}</h2>
            </li>
        );
    }
});

MarvelSearch.Views.CharacterList = React.createClass({
    render: function() {
        var listItems = [];
        if (this.props.collection) {
            this.props.collection.forEach(function(data) {
                listItems.push(<MarvelSearch.Views.CharacterListItem data={data} />)
            });
        }
        console.log(listItems);

        return (
            <ul className="character-list">
                {listItems}
            </ul>
        );
    }
});

MarvelSearch.Views.App = React.createClass({
    mixins: [Backbone.React.Component.mixin],
    handleUserSubmit: function (query) {
        this.getCollection().fetch({data: $.param({
            nameStartsWith: query,
            apikey: MarvelSearch.Constants.apiKey
        })});
    },
    render: function() {
        console.log(this.props);
        return (
            <div className="app-wrapper">
                <MarvelSearch.Views.SearchBox onUserSubmit={this.handleUserSubmit} />
                <MarvelSearch.Views.CharacterList collection={this.props.collection} />
            </div>
        );
    }
});

// Render out application
React.renderComponent(<MarvelSearch.Views.App collection={new MarvelSearch.Collections.Characters()} />, document.getElementById('app'));

window.MarvelSearch = MarvelSearch;

})(window);
