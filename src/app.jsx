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
      items: {}
    };
  },
  componentWillMount: function(){ //this will only run once and it will run whenever this compoenent get mounted to the DOM
    this.bindAsObject(new Firebase(RootURL + 'items/'), 'items'); //bindAsObject method comes from ReactFire
    //React will bind anything from the address of Firebase, such as 'items' into this.state, eg. this.state.items
  },
  render: function() {
    return (
      <div className="row panel panel-default">
        <div className="col-md-8 col-md-offset-2">
          <h2 className="text-center">Todo!</h2>
          <Header itemStore={this.firebaseRefs.items} />
          <List items={this.state.items} />
        </div>
      </div>
    );
  }
});

ReactDOM.render(<Hello />, document.querySelector('.container'));