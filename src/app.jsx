var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');
var RootURL = 'https://projectreact.firebaseio.com/';

var Hello = React.createClass({
  mixins: [ReactFire], // any method in Reactfire will be copied over into React
  getInitialState: function(){
    return {
      items: {},
      loaded: false
    };
  },
  componentWillMount: function(){ //this will only run once and it will run whenever this compoenent get mounted to the DOM
    this.fb = new Firebase(RootURL + 'items/');
    this.bindAsObject(this.fb, 'items'); //bindAsObject method comes from ReactFire
    //React will bind anything from the address of Firebase, such as 'items' into this.state, eg. this.state.items
    this.fb.on('value', this._handleDataLoaded);
  },
  _handleDataLoaded: function(){
    this.setState({
      loaded: true
    });
  },
  _handleDeleteList: function(){
    for(var prop in this.state.items){
      if(this.state.items[prop].done){
        this.fb.child(prop).remove();
      }
    }
  },
  _deleteButton: function(){
    return (
      <div className="text-center clear-complete">
        <hr />
        <button type="button" className="btn btn-warning" onClick={this._handleDeleteList}>Clear Complete</button>
      </div>
    )
  },
  render: function() {
    return (
      <div className="row panel panel-default">
        <div className="col-md-8 col-md-offset-2">
          <h2 className="text-center">Todo!</h2>
          <Header itemStore={this.firebaseRefs.items} />
          <hr />
          <div className={"content" + (this.state.loaded ? " loaded" : "")}>
            <List items={this.state.items} />
            {this._deleteButton()}
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<Hello />, document.querySelector('.container'));