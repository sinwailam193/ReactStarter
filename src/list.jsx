var React = require('react');
var ListItem = require('./list-item');

module.exports = React.createClass({
  _renderList: function(){
    if(!this.props.items){
      return (
        <h4>Add a todo to the list</h4>
      );
    }
    var children = [];
    for(var prop in this.props.items){
      var item = this.props.items[prop];
      item.key = prop;
      children.push(
        <ListItem key={prop} item={item} />
      );
    }
    return children; 
  },
  render: function(){
    return (
      <div>
        {this._renderList()}
      </div>
    )
  }
});