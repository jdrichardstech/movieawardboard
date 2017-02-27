import React, { Component } from 'react'
import SupportingActor from '../presentation/SupportingActor'
import { APIManager } from '../../utils'
import styles from './styles'


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
  		// superagent
  		// .get('/api/supportingactor')
  		// .query(null)
  		// .set('Accept', 'application/json')
  		// .end((err, response) => {
  			// if (err){
  			// 	alert('ERROR: '+err)
  			// 	return
  			// }
  			// let results = response.body.results
  			// this.setState({
  			// 	list: results
  			// })
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
	  .post('/api/supportingActor')
	  .send(this.state.nomination)
	  .set('Accept', 'application/json')
	  .end(function(err, res){
	    if (err || !res.ok) {
	      alert('Oh no! error');
	    } else {
	      console.log('posted ' + JSON.stringify(res.body));
	    }
	  });
	  this.setState({
	    list:updatedList
	  })
  }

  render(){
    var borderThis = {
      border:'1px solid #ddd'
    }

    var listItem = this.state.list.map((nomination, i)=>{
      return(
         <li key={i}><SupportingActor currentNomination={nomination} /></li>
       )
    })
    return(

      <div style={styles.nominations.border}>
        <h4>Supporting Actor:</h4>
        <ol style={styles.nominations.other}>
          {listItem}
        </ol>
	    {/*     <input onChange ={this.updateNomination.bind(this)} className="form-control" type="text" id="supportingActorName" placeholder="Supporting Actor" />
	        <button style={{marginBottom:20}}  onClick={this.submitNomination.bind(this)}  className="btn btn-success">Nominate</button>
	        */}
      </div>
    )
  }
}

export default SupportingActors
