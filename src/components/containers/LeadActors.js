import React, { Component } from 'react'
import LeadActor from '../presentation/LeadActor'
import { APIManager } from '../../utils'
import styles from './styles'
import { Link } from 'react-router'

class LeadActors extends Component{
  constructor(props){
    super(props)
    this.state={
      nomination:{
        leadActorName:''
      },
      list:[]
    }
  }

  componentDidMount(){
		APIManager.get('/api/leadactor', null, (err, response)=>{
			if (err){
				alert('ERROR: '+err)
				return
			}
			let results = response.results
			this.setState({
				list: results
			})
		})
	}

  updateNomination(event){
    let updatedNomination = Object.assign({}, this.state.nomination)
    updatedNomination[event.target.id] = event.target.value
    this.setState({
      nomination: updatedNomination
    })
  }

  submitNomination(event){
    let updatedList = Object.assign([],this.state.list)
    updatedList.push(this.state.nomination)
		APIManager.post('/api/leadactor', this.state.nomination, (err, response)=>{
			if (err || !res.ok) {
					 alert('Oh no! error');
				 } else {
					 console.log('leadactor posted');
				 }
				 this.setState({
					 list:updatedList
				 })
		})
  }

  render(){
    var listItem = this.state.list.map((nomination, i)=>{
      return(
        <li key={i}>
					<Link to={"/actor/"+nomination.leadActorName}>
						<LeadActor currentNomination={nomination} />
					</Link>
				</li>
       )
    })
    return(
      <div style={styles.nominations.border}>
      <h4>Lead Actor:</h4>
        <ol style={styles.nominations.other}>
          {listItem}
        </ol>
      </div>
    )
  }
}

export default LeadActors
