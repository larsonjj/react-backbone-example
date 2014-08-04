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
    componentDidMount: function() {
        this.refs.searchInput.getDOMNode().focus();
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var query = this.refs.searchInput.getDOMNode().value;
        if (query) {
            this.props.onUserSubmit(query);
        }
        else {
            alert('Search cannot be blank');
        }
    },
    handleChange: function() {
        var query = this.refs.searchInput.getDOMNode().value;
        if (query) {
            this.props.onUserSubmit(query);
        }
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
                    <input ref="searchInput" type="text" name="search" placeholder="Search Characters..." onChange={this.handleChange} />
                    <button className="search-button" onClick={this.handleSubmit}>{searchIcon}</button>
                </form>
            </div>
        );
    }
});

MarvelSearch.Views.CharacterListItem = React.createClass({
    ellipsis: function(text, maxLength) {
        var ret = text;
        if (ret.length > maxLength) {
            ret = ret.substr(0,maxLength-3) + "...";
        }
        return ret;
    },
    findLink: function(data) {
        var link = '';
        $.each(data, function(index) {
            if (data[index].type === 'wiki') {
                link = data[index];
            }
        });
        return link;
    },
    render: function() {
        var imagePath;
        var url = this.findLink(this.props.data.urls).url;
        if (this.props.data.thumbnail) {
            imagePath = this.props.data.thumbnail.path + '.' + this.props.data.thumbnail.extension;
        }
        else {
            imagePath = 'http://placehold.it/70x70';
        }
        return (
            <li className="character-list-item cf">
                <div className="thumbnail">
                    <img className="fluid" src={imagePath} />
                </div>
                <div className="list-details">
                    <h4 className="list-item-title">{this.props.data.name}</h4>
                    <p className="list-item-desription">{this.ellipsis(this.props.data.description, 180)}</p>
                    <p className="list-item-link"><a href={url} target="_blank">{url ? 'Details' : null}</a></p>
                </div>
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
        return (
            <ul className="character-list">
                {listItems}
                {this.props.searched && listItems.length < 1 ? <li className="center">No results</li> : null}
            </ul>
        );
    }
});

MarvelSearch.Views.App = React.createClass({
    mixins: [Backbone.React.Component.mixin],
    getInitialState: function() {
        return {
            searchIcon: true, // Show search icon by default
            searched: false
        };
    },
    handleUserSubmit: function (query) {
        var self = this;
        this.setState({searchIcon: false})
        this.getCollection().fetch({data: $.param({
            nameStartsWith: query,
            apikey: MarvelSearch.Constants.apiKey
        }),
        success: function() {
            self.setState({searchIcon: true})
            self.setState({searched: true})
        },
        error: function() {
            self.setState({searchIcon: true})
            self.setState({searched: true})
            console.error('Something went wrong when requesting from Marvel\'s API');
        }});
    },
    render: function() {
        return (
            <div className="app-wrapper">
                <MarvelSearch.Views.SearchBox onUserSubmit={this.handleUserSubmit} searchIcon={this.state.searchIcon} />
                <MarvelSearch.Views.CharacterList collection={this.props.collection} searched={this.state.searched} />
            </div>
        );
    }
});

// Render out application
React.renderComponent(<MarvelSearch.Views.App collection={new MarvelSearch.Collections.Characters()} />, document.getElementById('app'));

window.MarvelSearch = MarvelSearch;

})(window);
