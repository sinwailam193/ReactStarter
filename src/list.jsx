var React = require('react');

module.exports = React.createClass({
  _renderList: function(){
    if(this.props.items && Object.keys(this.props.items).length === 0){
      return (
        <h4>Add a todo to the list</h4>
      );
    }
    var children = [];
    for(var prop in this.props.items){
      children.push(<li key={prop}>{this.props.items[prop].text}</li>);
    }
    return children; 
  },
  render: function(){
    return (
      <ul>
        {this._renderList()}
      </ul>
    )
  }
});