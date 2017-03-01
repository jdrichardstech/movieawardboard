import React, { Component } from 'react'
import superagent from 'superagent'
import { Link } from 'react-router'
import styles from './styles'
import { Header } from '../containers'



class ActorInfo extends Component{
	constructor(){
		super()
		this.state={
			actorKnownForList:[],
			actorInfo:{},
			length:0
		}
	}
	componentDidMount(){

		let actorName = this.props.params.actorName
		actorName = actorName.replace(/\s+/g, '+').toLowerCase() //get rid of spaces and replace space with a + sign

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
				let length = info.length //this is the length of the array the results are in

				// console.log("ACTOR RESPONSE: " + JSON.stringify(info[0]['known_for'][0]['poster_path']))
				if(info.length==0){
					alert("Nobody by that name")
					return
				}
				let actorKnownForList = Object.assign([], this.state.actorKnownForList)
				for(let i = 0; i < info[0]['known_for'].length;i++){
					// console.log(i)
					actorKnownForList.push(info[0]['known_for'][i]['poster_path'])
				}

				// console.log("ACTOR LIST: " + JSON.stringify(actorKnownForList))
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
						// console.log("2nd query: " + JSON.stringify(res.body))
						let placeOfBirth = res.body.place_of_birth
						if(placeOfBirth==null){
							placeOfBirth='unknown'
						}
						let biography = res.body.biography
						let imdbId = res.body.imdb_id
						let actorImage = res.body.profile_path
						let jsonBirthday = res.body.birthday
						let birthdayArr = jsonBirthday.split('-')
						let year = birthdayArr.shift()
						birthdayArr.push(year)
						let birthday = birthdayArr.join('-')
						console.log("BIRTHDAY: " + JSON.stringify(birthday))
						// let birthdayArr = birthday.split('-')
						// let year= birthdayArr.shift()
						// birthdayArr = birthdayArr.push(year)
						// // let newBirthday = birthdayArr.join('-')
						// console.log("BIRTHDAY: "+ JSON.stringify(birthdayArr))

						let actorInfo = Object.assign({}, this.state.actorInfo)
						actorInfo['placeOfBirth'] = placeOfBirth
						actorInfo['biography'] = biography
						actorInfo['imdbId'] = imdbId
						actorInfo['actorImage'] = actorImage
						actorInfo['birthday'] = birthday



						// console.log("IMDB: " + JSON.stringify(imdbId))
						this.setState({
							actorInfo,
							actorKnownForList,
							length
						})
				})
		})
	}


	render(){
		let moviesKnownFor = this.state.actorKnownForList.map((posterId, i)=>{
			return <img key={i} style={{paddingRight:20}} src={"http://image.tmdb.org/t/p/w185//"+posterId} />
		})
		let actor = this.state.actorInfo
		// console.log("LENGTH: " + JSON.stringify(actor.length))
		let content = (this.state.length == 0) ? 'NOBODY BY THAT NAME' :
		<div>
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<center><h1 style={{padding:'50px 0'}}>{this.props.params.actorName}</h1></center>
					</div>
				</div>
			</div>
			<div className="container" style={{padding:50, border:'1px solid white',marginBottom:50}}>
			<div className="row">
				<div className="col-md-3">
					<img src={`http://image.tmdb.org/t/p/w342/${actor.actorImage}`} /><br />
					<p style={{marginTop:20}}>Born in: {actor.placeOfBirth}</p>
					<p>Birthday: {actor.birthday}</p>
				</div>
				<div className="col-md-8 col-md-offset-1">
					<p style={{marginBottom:30}}>{actor.biography}</p>
					<h3>Also Known For:</h3>
					<center><p>{moviesKnownFor}</p></center>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<center>
						 <Link to = "/"><button style={styles.nominations.button}  type="" className="btn btn-info btn-lg" style={{margin:'30px auto'}}>Home</button></Link>
					</center>
				</div>
			</div>
		</div>
	</div>
		return(
			<div>
				<Header />
				{content}
			</div>
		)
	}
}

export default ActorInfo
