var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      text: ''
    };
  },
  _handleInputChange: function(event){
    // event is an object that describes the event that just happened
    // event.target is the DOM reference to whatever the element that event happened to
    // in this case, event.target is referencing the input element
    this.setState({
      text: event.target.value
    });
  },
  _handleClick: function(){
    // send value of text input to Firebase
    this.props.itemStore.push({
      text: this.state.text,
      done: false
    });
    this.setState({
      text: ''
    })
  },
  render: function(){
    return (
      <div className="input-group">
        <input type="text" className="form-control" onChange={this._handleInputChange} value={this.state.text} />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={this._handleClick}>Add</button>
        </span>
      </div>
    );
  }
});