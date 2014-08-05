/** @jsx React.DOM */

(function(window) {
'use strict';

var MarvelSearch = window.MarvelSearch;

MarvelSearch.Views.App = React.createClass({
    mixins: [Backbone.React.Component.mixin],
    getDefaultProps: function() {
        return {
            searchIcon: true, // Show search icon by default
        };
    },
    handleUserSubmit: function (query) {
        var self = this;
        if (query.reset) {
            return this.getCollection().reset();
        }
        this.props.searchIcon = false;
        this.getCollection().fetch({data: $.param({
            nameStartsWith: query,
            apikey: MarvelSearch.Constants.apiKey
        }),
        error: function() {
            if (query) {
                console.error('Something went wrong when requesting from Marvel\'s API');
            }
        },
        complete: function() {
            self.props.searchIcon = true;
            self.props.searched = query;
        }});
    },
    render: function() {
        return (
            <div className="app-wrapper">
                <MarvelSearch.Views.SearchBox
                    onUserSubmit={this.handleUserSubmit}
                    searchIcon={this.props.searchIcon}
                />
                <MarvelSearch.Views.CharacterList
                    data={this.props.collection}
                    searched={this.props.searched}
                />
            </div>
        );
    }
});

// Render out application
React.renderComponent(<MarvelSearch.Views.App collection={new MarvelSearch.Collections.Characters()} />, document.getElementById('app'));

window.MarvelSearch = MarvelSearch;

})(window);
