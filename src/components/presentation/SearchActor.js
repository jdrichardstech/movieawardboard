import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './styles'

class SearchActor extends Component{
	constructor(){
		super()
		this.state={
			actorName:''
		}
	}

	updateSearch(event){

		let updatedName = Object.assign({}, this.state)
		updatedName['actorName'] = event.target.value.trim()
		this.setState({
			actorName : updatedName['actorName']
		})
		// console.log("ACTOR: " + JSON.stringify(this.state.actorName))
	}

	submitSearch(event){
		// console.log('Submitsearch')
	}

	render(){
		return(
			<div>
				<h2>Get Actor or Actress Info</h2><br />
				<h5>Enter Name of Actor or Actress:</h5><br />
				<input className="form-control" onChange={this.updateSearch.bind(this)} style={{backGround:'black',color:'#999'}} id="actorName" ref="actorName" /><br />
				<Link to={"/actor/"+this.state.actorName}><button className="btn btn-info" style={styles.nominations.button} onClick={this.submitSearch.bind(this)}> Search</button></Link><br />
			</div>
		)
	}
}

export default SearchActor
