import React from "react"

const GalleryColumn = (props) => {
  return(
    <div className="gallery-column">
      {props.children.map(child => child)}
    </div>
  )
}

export default GalleryColumn