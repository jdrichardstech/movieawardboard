import React, { Component } from 'react'
import superagent from 'superagent'
import { Link } from 'react-router'



class ActorInfo extends Component{
	constructor(){
		super()
		this.state={

		}
	}
	componentDidMount(){

		let actorName = this.props.params.actorName
		actorName = actorName.replace(/\s+/g, '+').toLowerCase()

		let url = `https://api.themoviedb.org/3/search/person?api_key=4160bdc56f74445097c8012631f85743&query=${actorName}`
		superagent
		.get(url)
		.query(null)
		.set('Accept', 'application/json')
		.end((err, response) => {
				if(err){
					alert(err)
					return
				}
				let info = response.body.results
				let length = info.length
				this.setState({
					length:length
				})
				// console.log("ACTOR RESPONSE: " + JSON.stringify(info[0]['known_for'][0]['poster_path']))
				if(info.length==0){
					alert("Nobody by that name")
					return
				}
				let actorKnownForList = []
				for(let i = 0; i < info[0]['known_for'].length;i++){
					console.log(i)
					actorKnownForList.push(info[0]['known_for'][i]['poster_path'])
				}

				console.log("ACTOR LIST: " + JSON.stringify(actorKnownForList))
				let id = info[0].id
				superagent
				.get(`https://api.themoviedb.org/3/person/${id}?api_key=4160bdc56f74445097c8012631f85743&append_to_response=images`)
				.query(null)
				.set('Accept', 'application/json')
				.end((err, res) => {
						if(err){
							alert(err)
							return
						}
						console.log("2nd query: " + JSON.stringify(res.body))
						let placeOfBirth = res.body.place_of_birth
						let biography = res.body.biography
						let imdbId = res.body.imdb_id
						let profilePic = res.body.profile_path
						console.log("IMDB: " + JSON.stringify(imdbId))
				})
		})
	}


	render(){
		let content = (this.state.length == 0) ? 'NOBODY BY THAT NAME' : <center><h1>{this.props.params.actorName}</h1></center>
		return(
			<div>
				{content}
			</div>
		)
	}
}

export default ActorInfo
