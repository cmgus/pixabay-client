import React, { Component } from "react"
import { Pagination, Section, Level } from "rbx";
import GalleryItem from "../components/GalleryItem";
import GalleryColumn from "./GalleryColumn";

class Gallery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      col_count: 4,
      columns: [],
      currentPage: 20,
      perPage: 20,
      totalHits: 500
    }
  }
  nextPage = () => {
    this.setState((state, props) => ({
      currentPage: state.currentPage + 1
    }))
  }
  previousPage = () => {
    this.setState((state, props) => ({
      currentPage: state.currentPage - 1
    }))
  }
  render() {
    if (!this.props.hits[0]) return (<div></div>)
    let columns = []
    for (let c = 0; c < this.state.col_count; c++) {
      let itemsColumn = this.props.hits.filter((hit, i) => (i - c) % this.state.col_count === 0)
      columns.push(itemsColumn)
    }
    let currentPage = this.state.currentPage
    let totalPage = Math.ceil(this.state.totalHits / this.state.perPage)
    return (
      <Section>
        <div className={`gallery-layout columns-${this.state.col_count}`}>
          {columns.map((column, i) => (
            <GalleryColumn key={i} >
              {column.map(item => (<GalleryItem key={item.id} url={item.webformatURL} />))}
            </GalleryColumn>
          ))}
        </div>
        <br />
        <div>
          <Level>
            <Level.Item textAlign="centered">
              <div>
                <Pagination align="centered" rounded>
                  {(currentPage - 1) !== 0 ?
                    <Pagination.Step align="previous" onClick={this.previousPage}>Previous</Pagination.Step> :
                    <Pagination.Step align="previous" disabled>Previous</Pagination.Step>
                  }
                  {(currentPage !== totalPage) ?
                    <Pagination.Step align="next" onClick={this.nextPage}>Next page</Pagination.Step> :
                    <Pagination.Step align="next" disabled>Next page</Pagination.Step>
                  }
                  <Pagination.List>
                    {(currentPage) > 2 &&
                      <Pagination.Link>1</Pagination.Link>
                    }
                    {currentPage > 3 &&
                      <Pagination.Ellipsis />
                    }
                    {currentPage !== 1 &&
                      <Pagination.Link>{currentPage - 1}</Pagination.Link>
                    }
                    <Pagination.Link current>{currentPage}</Pagination.Link>
                    {currentPage < (totalPage) &&
                      <Pagination.Link>{currentPage + 1}</Pagination.Link>
                    }
                    {currentPage < (totalPage - 2) &&
                      <Pagination.Ellipsis />
                    }
                    {currentPage < (totalPage - 1) &&
                      <Pagination.Link>{totalPage}</Pagination.Link>
                    }
                  </Pagination.List>
                </Pagination>
              </div>
            </Level.Item>
          </Level>
        </div>
      </Section>
    )
  }
}

export default Gallery