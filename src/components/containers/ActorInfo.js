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
					actorKnownForList.push(info[0]['known_for'][i])

				}

				console.log("KNOWNFOR: " + JSON.stringify(actorKnownForList))
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
						let actorInfo = Object.assign({}, this.state.actorInfo)
						actorInfo['placeOfBirth'] = placeOfBirth
						actorInfo['biography'] = biography
						actorInfo['imdbId'] = imdbId
						actorInfo['actorImage'] = actorImage
						actorInfo['birthday'] = birthday

						this.setState({
							actorInfo,
							actorKnownForList,
							length
						})
				})
		})
	}

	render(){

		let moviesKnownFor = this.state.actorKnownForList.map((knownForInfo, i)=>{
			return <Link to = {`/singlemovie/${knownForInfo.id}`}><img key={i} style={{paddingRight:20}} src={"http://image.tmdb.org/t/p/w185//"+knownForInfo.poster_path} /></Link>
		})
		let actor = this.state.actorInfo
		let actorImage = (actor.actorImage !=null)?
			<img src={`http://image.tmdb.org/t/p/w342/${actor.actorImage}`} />
			:
			<img style={{width:342, height:500}} src="/assets/img/noprofile.jpg" />
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
					{actorImage}<br />
					<p style={{marginTop:20}}>Born in: {actor.placeOfBirth}</p>
					<p>Birthday: {actor.birthday}</p>
					<p><a href={`http://www.imdb.com/name/${actor.imdbId}/?ref_=nv_sr_1`} target="_blank">IMDB</a></p>
				</div>
				<div className="col-md-8 col-md-offset-1">
					<h3>Biography:</h3>
					<p style={{marginBottom:30}}>{actor.biography}</p>
					<h3>Also Known For:</h3>
					<center>
						<p>{moviesKnownFor}</p><br />
						<p style={{fontSize:'.9em'}}>(click image for movie details)</p>
					</center>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<center>
						 <Link to = "/"><button style={styles.nominations.button}  type="" className="btn btn-info btn-lg" style={{margin:'50px auto 30px auto'}}>Home</button></Link>
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
