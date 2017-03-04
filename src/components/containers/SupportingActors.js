import React, { Component } from 'react'
import SupportingActor from '../presentation/SupportingActor'
import { APIManager } from '../../utils'
import styles from './styles'
import { Link } from 'react-router'

class SupportingActors extends Component{
  constructor(props){
    super(props)
    this.state={
      nomination:{
        supportingActorName:''
      },
      list:[]
    }
  }

  componentDidMount(){
		APIManager.get('/api/supportingactor', null, (err, response)=>{
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
		APIManager.post('/api/supportingActor', this.state.nomination, (err, response)=>{
			if (err || !res.ok) {
	       alert('Oh no! error');
	     } else {
	       console.log('supportingActor posted');
	     }
			 this.setState({
				 list:updatedList
			 })
		})
  }

  render(){
    var borderThis = {
      border:'1px solid #ddd'
    }

    var listItem = this.state.list.map((nomination, i)=>{
      return(
         <li className="tag-box tag-box-v3"style={{marginBottom:30}} key={i}>
					 <Link to={"/actor/"+nomination.supportingActorName}>
					 	<SupportingActor idx={i+1} currentNomination={nomination} />
					 </Link>
				 </li>
       )
    })
    return(
			<div>
	      <div className="headline" style={{marginBottom:40}}>
	        <h4>Supporting<br />Actor:</h4>
				</div>
        <ul style={styles.nominations.other}>
          {listItem}
        </ul>
      </div>
    )
  }
}

export default SupportingActors
