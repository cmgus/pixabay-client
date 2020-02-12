import React, { Component } from 'react';

import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Gallery from './containers/Gallery';

class App extends Component {
  state = {
    term: null
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.setState({ term: new FormData(ev.target).get('term') })
  }

  render() {
    return (
      <div>
        <Header>
          <SearchBar handleSubmit={this.handleSubmit} />
        </Header>
        <Gallery term={this.state.term} />
      </div>
    );
  }
}

export default App;
