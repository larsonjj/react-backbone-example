/** @jsx React.DOM */

(function(window) {
'use strict';

var MarvelSearch = window.MarvelSearch;

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
        data.forEach(function(ele) {
            if (ele.type === 'wiki') {
                link = ele;
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

window.MarvelSearch = MarvelSearch;

})(window);
