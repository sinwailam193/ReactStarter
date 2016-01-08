var React = require('react');
var Firebase = require('firebase');
var RootURL = 'https://projectreact.firebaseio.com/';

module.exports = React.createClass({
  getInitialState: function(){
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    };
  },
  componentWillMount: function(){
    this.fb = new Firebase(RootURL + 'items/' + this.props.item.key);
  },
  _handleDoneChange: function(event){
    var update = event.target.checked;
    this.setState({
      done: update,
      textChanged: (update ? false : this.state.textChanged)
    });
    this.fb.update({
      done: update
    });
  },
  _handleDeleteClick: function(){
    this.fb.remove();
  },
  _handleTextChange: function(event){
    this.setState({
      text: event.target.value,
      textChanged: true
    });
  },
  _handleUndoClick: function(){
    this.setState({
      text: this.props.item.text,
      textChanged: false
    });
  },
  _handleSaveClick: function(){
    this.fb.update({
      text: this.state.text
    });
    this.setState({
      textChanged: false
    });
  },
  _changesButtons: function(){
    if(!this.state.textChanged){
      return null;
    }
    return [
      <button key={1} className="btn btn-default" onClick={this._handleSaveClick} >Save</button>,
      <button key={2} className="btn btn-default" onClick={this._handleUndoClick} >Undo</button>
    ];
  },
  render: function(){
    return (
      <div className="input-group">
        <span className="input-group-addon">
          <input type="checkbox" checked={this.state.done} onChange={this._handleDoneChange}/>
        </span>
        <input type="text" className="form-control" value={this.state.text} onChange={this._handleTextChange} disabled={this.state.done} />
        <span className="input-group-btn">
          {this._changesButtons()}
          <button className="btn btn-default" onClick={this._handleDeleteClick}>Delete</button>
        </span>
      </div>
    )
  }
});