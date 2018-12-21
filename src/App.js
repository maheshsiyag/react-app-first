import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import  Menu   from './components/MenuComponents';

class App extends Component {
  render() {
    return (
      <div className="App">
            <Menu />
        </div>
       
    );
  }
}

export default App;
