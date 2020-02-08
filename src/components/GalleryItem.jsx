import React from "react"

const GalleryItem = (props) => {
  return(
    <div className="gallery-item">
      <img src={props.url} alt="" />
    </div>
  )
}

export default GalleryItem