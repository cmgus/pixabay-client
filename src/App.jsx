import React, { Component } from 'react';

import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';

class App extends Component {
  state = { term: '' }
  setTerm = (ev) => {
    this.setState({ term: ev.target.value }, () => console.log(this.state.term))
  }
  render() {
    return (
      <div className="App">
        <Header>
          <SearchBar setTerm={this.setTerm} />
        </Header>
      </div>
    );
  }
}

export default App;
