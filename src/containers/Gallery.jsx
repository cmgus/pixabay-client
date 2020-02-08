import React, { Component } from "react"
import { Section } from "rbx";
import GalleryItem from "../components/GalleryItem";
import GalleryColumn from "./GalleryColumn";
class Gallery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      col_count: 3,
      columns: []
    }
  }
  render() {
    if (!this.props.hits[0]) return (<div></div>)
    let columns = []
    for (let c = 0; c < this.state.col_count; c++) {
      let itemsColumn = this.props.hits.filter((hit, i) => (i - c) % 3 === 0)
      columns.push(itemsColumn)
    }
    return (
      <Section className={`gallery-layout columns-${this.state.col_count}`}>
        {columns.map((column, i) => (
          <GalleryColumn key={i} >
            {column.map(item => (<GalleryItem key={item.id} url={item.webformatURL} />))}
          </GalleryColumn>
        ))}
      </Section>
    )
  }
}

export default Gallery