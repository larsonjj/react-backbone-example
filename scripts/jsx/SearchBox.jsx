/** @jsx React.DOM */

(function(window) {
'use strict';

var MarvelSearch = window.MarvelSearch;

MarvelSearch.Views.SearchBox = React.createClass({
    componentDidMount: function() {
        this.searchInput = this.refs.searchInput.getDOMNode();
        this.inputClear = this.refs.clear.getDOMNode();
        this.searchInput.focus();
    },
    handleSubmit: function() {
        var query = this.searchInput.value;
        if (query) {
            if ($(this.inputClear).hasClass('hide')) {$(this.inputClear).removeClass('hide');}
        }
        else {
            if (!$(this.inputClear).hasClass('hide')) {$(this.inputClear).addClass('hide');}
        }
        this.props.onUserSubmit(query);
    },
    handleClear: function() {
        $(this.inputClear).addClass('hide');
        this.searchInput.value = '';
        this.searchInput.focus();
        this.props.onUserSubmit({reset: true});
    },
    render: function() {
        // show search icon, or loading icon based on fetch from Marvel's database
        var searchIcon = this.props.searchIcon ? <i className="fa fa-search fa-lg"></i> : <i className="fa fa-circle-o-notch fa-lg fa-spin"></i>;
        return (
            <div className="search-box-wrapper">
                <div className="marvel-attribution">
                    <p>Data provided by Marvel. © 2014 Marvel</p>
                </div>
                <form id="character-search-form" className="cf">
                    <input id="search" ref="searchInput" type="text" name="search" placeholder="Search Characters..." onChange={this.handleSubmit} />
                    <span ref="clear" className="hide" onClick={this.handleClear}><i className="fa fa-times-circle"></i></span>
                    <button className="search-button" onClick={this.handleSubmit}>{searchIcon}</button>
                </form>
            </div>
        );
    }
});

window.MarvelSearch = MarvelSearch;

})(window);
