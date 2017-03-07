import React,{ Component } from 'react'
import { Link } from 'react-router'

class MovieTrailer extends Component{
  componentDidMount(){
    console.log("YOUTUBE ID: " + this.props.params.youtubeID)
  }

  render(){
		let content = null
    if(this.props.params.youtubeID != "novideo"){
    content=( <div>
               <iframe id="ytplayer" type="text/html" width="640" height="360"
               src={"https://www.youtube.com/embed/"+this.props.params.youtubeID+"?autoplay=1&origin=http://example.com"}
               frameborder="0" allowfullscreen></iframe>
              </div>
						)
    }else{
  		content=(<div><h1>Sorry!<br /> No Trailer for this movie</h1></div>)
    }

    return(
      <div>
        <div style={{marginTop:50, marginBottom:50}}>
        <center>
	      	<h1>Trailer</h1>
	        {content}
					<br />
				  <Link to={"singlemovie/"+this.props.params.id}><button style={{marginBottom:20}} className="btn btn-success">Back</button></Link><br />
        </center>
       </div>
      </div>
    )
  }
}

export default MovieTrailer
