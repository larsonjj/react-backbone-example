/** @jsx React.DOM */

(function() {
'use strict';

var MarvelSearch = window.MarvelSearch;

MarvelSearch.Views.CharacterList = React.createClass({
    render: function() {
        var listItems = [];
        if (this.props.data) {
            this.props.data.forEach(function(data) {
                listItems.push(<MarvelSearch.Views.CharacterListItem data={data} />)
            });
        }
        // Check to see if input is empty
        if (!$('#search').val()) {
            this.props.searched = false;
        }
        return (
            <ul className="character-list">
                {this.props.searched ? listItems : null}
                {this.props.searched && listItems.length < 1 ? <li className="no-results center">No results for "{this.props.searched}"</li> : null}
            </ul>
        );
    }
});

window.MarvelSearch = MarvelSearch;

})(window);
