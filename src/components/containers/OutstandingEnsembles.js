import React, { Component } from 'react'
import OutstandingEnsemble from '../presentation/OutstandingEnsemble'
import { APIManager } from '../../utils'
import styles from './styles'

class OutstandingEnsembles extends Component{
  constructor(props){
    super(props)
    this.state={
      nomination:{
        outstandingEnsembleMovie:''
      },
      list:[]
    }
  }

  componentDidMount(){
		APIManager.get('/api/outstandingensemble',null,(err, response)=>{
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
		APIManager.post('/api/outstandingEnsemble', this.state.nomination, (err, response)=>{
			if (err || !res.ok) {
		       alert('Oh no! error');
		     } else {
		       console.log('outstandingEnsemble posted');
		     }
				 this.setState({
					 list:updatedList
				 })
		})
  }

  render(){
    var listItem = this.state.list.map((nomination, i)=>{
      return(
         <li key={i}><OutstandingEnsemble currentNomination={nomination} /></li>
       )
    })
    return(
      <div style={styles.nominations.border}>
        <h4>Outstanding Ensemble:</h4>
        <ol style={styles.nominations.other}>
          {listItem}
        </ol>
      </div>
    )
  }
}

export default OutstandingEnsembles
