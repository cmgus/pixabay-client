import React, { Component } from 'react';

import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Gallery from './containers/Gallery';

class App extends Component {
  state = {
    term: '',
    hits: []
  }
  setTerm = (ev) => {
    this.setState({ term: ev.target.value })
  }
  fetchAPI = async () => {
    const response = await fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_KEY}&q=${this.state.term}&image_type=photo`)
    console.log(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_KEY}&q=${this.state.term}&image_type=photo`)
    const data = await response.json()
    console.log(data)
    this.setState({ hits: data.hits, submitted: true })
  }
  render() {
    return (
      <div>
        <Header>
          <SearchBar fetchAPI={this.fetchAPI} setTerm={this.setTerm} />
        </Header>
        <Gallery hits={this.state.hits} renderColumn={false} />
      </div>
    );
  }
}

export default App;
