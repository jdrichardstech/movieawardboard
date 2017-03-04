import React, { Component } from 'react'
import BestStunt from '../presentation/BestStunt'
import { APIManager } from '../../utils'
import styles from './styles'

class BestStunts extends Component{
  constructor(props){
    super(props)
    this.state={
      nomination:{
        bestStuntsMovie:''
      },
      list:[]
    }
  }

  componentDidMount(){
		APIManager.get('/api/beststunts',null,(err, response)=>{
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
		APIManager.post('/api/beststunts', this.state.nomination, (err, response)=>{
			if (err || !res.ok) {
				 alert('Oh no! error');
			 } else {
				 console.log('beststunts posted');
			 }
			 this.setState({
				 list:updatedList
			 })
		})
  }

  render(){
    var listItem = this.state.list.map((nomination, i)=>{
      return(
         <li className="tag-box tag-box-v3"style={{marginBottom:30}} key={i}>
					 <BestStunt idx={i+1} currentNomination={nomination} />
				 </li>
       )
    })

    return(
			<div>
	      <div className="headline" style={{marginBottom:40}}>
	        <h4>Best<br />Stunts:</h4>
				</div>
        <ul style={styles.nominations.other}>
          {listItem}
        </ul>
      </div>
    )
  }
}

export default BestStunts
