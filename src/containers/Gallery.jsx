import React, { Component } from "react"
import { Pagination, Section, Level } from "rbx";
import GalleryItem from "../components/GalleryItem";
import GalleryColumn from "./GalleryColumn";

class Gallery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      col_count: 4,
      term: null,
      currentPage: 1,
      perPage: 20,
      totalHits: 0
    }
  }
  fetchAPI = async (term, page = 1) => {
    const response = await fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_KEY}&q=${term}&image_type=photo&page=${page}`)
    //console.log(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_KEY}&q=${term}&image_type=photo&page=${page}`)
    const data = await response.json()
    this.setState({ term: term, externalData: data })
  }
  gotoPage = (ev) => {
    ev.preventDefault()
    const { name, text } = ev.target
    let page = 0
    switch (name) {
      case 'next':
        page = this.state.currentPage + 1
        break
      case 'prev':
        page = this.state.currentPage - 1
        break
      default:
        page = Number(text)
        break
    }
    this.setState({ currentPage: page })
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.term !== prevState.oldTerm) {
      return {
        term: null,
        oldTerm: nextProps.term,
        currentPage: 1
      }
    }
    return null;
  }
  componentDidUpdate(nextProps, prevState) {
    if (this.state.term === null || prevState.currentPage !== this.state.currentPage) {
      this.fetchAPI(this.props.term, this.state.currentPage)
    }
  }
  render() {
    if (!this.state.externalData) return (<div></div>)
    let columns = []
    for (let c = 0; c < this.state.col_count; c++) {
      let itemsColumn = this.state.externalData.hits.filter((hit, i) => (i - c) % this.state.col_count === 0)
      columns.push(itemsColumn)
    }
    let currentPage = this.state.currentPage
    let totalPage = Math.ceil(this.state.externalData.totalHits / this.state.perPage)

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
                    <Pagination.Step align="previous" name="prev" onClick={this.gotoPage}>Previous</Pagination.Step> :
                    <Pagination.Step align="previous" disabled>Previous</Pagination.Step>
                  }
                  {(currentPage < totalPage) ?
                    <Pagination.Step align="next" name="next" onClick={this.gotoPage}>Next page</Pagination.Step> :
                    <Pagination.Step align="next" disabled>Next page</Pagination.Step>
                  }
                  <Pagination.List>
                    {(currentPage) > 2 &&
                      <Pagination.Link onClick={this.gotoPage}>1</Pagination.Link>
                    }
                    {currentPage > 3 &&
                      <Pagination.Ellipsis />
                    }
                    {currentPage !== 1 &&
                      <Pagination.Link onClick={this.gotoPage}>{currentPage - 1}</Pagination.Link>
                    }
                    <Pagination.Link current>{currentPage}</Pagination.Link>
                    {currentPage < (totalPage) &&
                      <Pagination.Link onClick={this.gotoPage}>{currentPage + 1}</Pagination.Link>
                    }
                    {currentPage < (totalPage - 2) &&
                      <Pagination.Ellipsis />
                    }
                    {currentPage < (totalPage - 1) &&
                      <Pagination.Link onClick={this.gotoPage}>{totalPage}</Pagination.Link>
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