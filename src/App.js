import React, { Component } from 'react';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Menu from './components/MenuComponents';
import { DISHES } from './shared/dishes';

class App extends Component {
  render() {
    return (
        <div className="App">
            <Menu dises={DISHES} />
        </div>
       
    );
  }
}

export default App;

