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
		this.refs.actorName.value=''
	}

	render(){
		return(
			<div>
				<h2>Google Movie Name for Cast Members</h2><br />
				<h5>Enter the movie name:</h5><br />
				<input className="form-control" onChange={this.updateSearch.bind(this)} style={{backGround:'black',color:'#999'}} id="actorName" ref="actorName" /><br />
				<button className="btn btn-success" style={styles.nominations.button}  onClick={this.submitSearch.bind(this)} href={`https://www.google.com/search?q=${this.state.castName}+cast&oq=${this.state.castName}+cast&aqs=chrome..69i57.3111j0j7&sourceid=chrome&ie=UTF-8`}target="_blank">Find Movie Cast</button><br />
			</div>
		)
	}
}

export default GoogleTheMovie
