import React, { Component } from 'react'
import LeadActor from '../presentation/LeadActor'
import { APIManager } from '../../utils'
import styles from './styles'


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
		// superagent
		// .get('/api/leadactor')
		// .query(null)
		// .set('Accept', 'application/json')
		// .end((err, response) => {
		// 	if (err){
		// 		alert('ERROR: '+err)
		// 		return
		// 	}
		//
		// 	// console.log(JSON.stringify(response.body))
		// 	let results = response.body.results
		//
		// 	this.setState({
		// 		list: results
		// 	})
		// })
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
	  superagent
	  .post('/api/leadactor')
	  .send(this.state.nomination)
	  .set('Accept', 'application/json')
	  .end(function(err, res){
	    if (err || !res.ok) {
	      alert('Oh no! error');
	    } else {
	      console.log('leadActor posted');
	    }
	  });
	  this.setState({
	    list:updatedList
	  })
  }

  render(){
    var listItem = this.state.list.map((nomination, i)=>{
      return(
        <li key={i}><LeadActor currentNomination={nomination} /></li>
       )
    })
    return(
      <div style={styles.nominations.border}>
      <h4>Lead Actor:</h4>
        <ol style={styles.nominations.other}>
          {listItem}
        </ol>

      {/*   <input onChange ={this.updateNomination.bind(this)} className="form-control" type="text" id="leadActorName" placeholder="Lead Actor" /><br />
        <button style={{marginBottom:20}} onClick={this.submitNomination.bind(this)}  className="btn btn-success">Nominate</button>
        */}
      </div>
    )
  }
}

export default LeadActors
