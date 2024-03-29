import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {

    static defaultProps = {
        country:'in',
        pageSize: 6,
        category:'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

  

  constructor(props){
    super(props);
    this.state={
       articles :[],
       loading:false,
       page:1
    }

    
  }

  async updateNews(){

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=69cfb51d5cbb4676b7dcea3d0b9f1e77&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
       articles: parsedData.articles,
       totalResults: parsedData.totalResults,
       loading:false
   })

  }
  async componentDidMount(){
    this.updateNews()
  }

  handlePrevClick = async() =>{

    this.setState({
        page:this.state.page-1
    })
    this.updateNews() 
  }

  handleNextClick = async () => {

    this.setState({
        page:this.state.page+1
    })
    this.updateNews()
  };
  

  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center fs-3'>LATEST <span className='badge bg-danger'> News </span></h2>
        {this.state.loading && <Spinner />}
        <div className="row mt-3">
          {!this.state.loading && this.state.articles.map((element)=>{
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 43) : "Meta says it will pass on the Apple tax to ad..."} description={element.description ? element.description.slice(0, 88) : "Days after speculation of former Madhya Pradesh chief minister Kamal Nath switching side"} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
            );
          })}
        </div>
  
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} className='btn btn-danger' onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className='btn btn-danger' onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
  
  }


export default News
