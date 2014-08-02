/** @jsx React.DOM */

(function(window) {

var MarvelSearch = {
    Models: {},
    Collections: {},
    Views: {}
};

MarvelSearch.Views.App = React.createClass({
    render: function() {
        return (
            <div className="app-wrapper">
                <h1>Hello World</h1>
            </div>
        );
    }
});

// Render out application
React.renderComponent(<MarvelSearch.Views.App />, document.getElementById('app'));

window.MarvelSearch = MarvelSearch;

})(window);
