import React from 'react'

const MovieDetails = (props) => {
  return(
    <div className="news-v3 bg-color-black">
      <div className="news-v3-in" style={{color:'black'}}>
				<center>
					<h4>Actors/Actresses Under Consideration for Nomination For:</h4>
	        <h2 style={{color:'green rgb(92, 184, 92)', paddingBottom:15}}>{props.movieName}</h2>
	        <h5><span style={{fontWeight:'bold',paddingRight:5}}>Lead Actor(s): </span><span style={{color:'rgb(92, 184, 92)'}}> {props.leadActor}</span></h5>
	        <h5><span style={{fontWeight:'bold',paddingRight:5}}>Lead Actress(es): </span><span style={{color:'rgb(92, 184, 92)'}}> {props.leadActress}</span></h5>
	        <h5><span style={{fontWeight:'bold',paddingRight:5}}>Supporting Actor(s): </span><span style={{color:'rgb(92, 184, 92)'}}> {props.supportingActor}</span></h5>
	        <h5><span style={{fontWeight:'bold',paddingRight:5}}>Supporting Actress(es): </span><span style={{color:'rgb(92, 184, 92)'}}> {props.supportingActress}</span></h5>
				</center>

      </div>
    </div>
  )
}

export default MovieDetails
