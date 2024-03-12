import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description, imageUrl,newsUrl,author,date,source} = this.props
    return (
      <div>
         <div className="card bg-dark text-light mb-3 mx-3 px-2 py-2 mt-4" style={{maxWidth:"345px"}}>
         <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%", zIndex:"1"}}>
    {source}
  </span>
  <img src={!imageUrl?"https://techcrunch.com/wp-content/uploads/2023/12/GettyImages-1425576452.jpg?resize=1200,675":imageUrl} style={{height:"180px"}} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}... </h5>
    <p className="card-text">{description}...</p>
    <p className="card-text mt-3"><small className="text-info">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} target='_blank'rel="noreferrer" className="btn btn-sm btn-danger">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
