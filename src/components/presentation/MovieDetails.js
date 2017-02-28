import React from 'react'

const MovieDetails = (props) => {
  return(
    <div className="news-v3 bg-color-black">
      <div className="news-v3-in" style={{color:'black'}}>
				<center>
					<h4>Submitted Nomination Considerations For:</h4>
	        <h2 style={{color:'green', paddingBottom:15}}>{props.movieName}</h2>
	        <h5><span style={{fontWeight:'bold'}}>Lead Actor(s):</span> {props.leadActor}</h5>
	        <h5><span style={{fontWeight:'bold'}}>Lead Actress(es):</span> {props.leadActress}</h5>
	        <h5><span style={{fontWeight:'bold'}}>Supporting Actor(s):</span> {props.supportingActor}</h5>
	        <h5><span style={{fontWeight:'bold'}}>Supporting Actress(es):</span> {props.supportingActress}</h5>
				</center>

      </div>
    </div>
  )
}

export default MovieDetails
