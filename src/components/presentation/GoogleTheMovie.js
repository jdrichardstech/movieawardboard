import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './styles'

class GoogleTheMovie extends Component{
	constructor(){
		super()
		this.state={
			castName:''
		}
	}

	updateSearch(event){
		let updatedName = Object.assign({}, this.state)
		updatedName['castName'] = event.target.value
		this.setState({
			castName : updatedName['castName']
		})
	}

	submitSearch(event){
		let url = `https://www.google.com/search?q=${this.state.castName}+cast&oq=${this.state.castName}+cast&aqs=chrome..69i57.3111j0j7&sourceid=chrome&ie=UTF-8`
		window.open(url, '_blank')
		this.refs.actorName.value=''
	}

	render(){
		return(
			<div>
				<h2>Google the Cast</h2>
				<p>Enter the name of a movie to find out names of cast members in that movie</p><br />
				<label><h5>Enter the movie name:</h5></label><br />
				<input className="form-control" onChange={this.updateSearch.bind(this)} style={{backGround:'black',color:'#999'}} id="actorName" ref="actorName" /><br />
				<button className="btn btn-success" style={styles.nominations.button}  onClick={this.submitSearch.bind(this)}> Find Movie Cast</button><br />
			</div>
		)
	}
}

export default GoogleTheMovie
