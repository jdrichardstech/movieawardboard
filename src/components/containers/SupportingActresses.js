import React, { Component } from 'react'
import SupportingActress from '../presentation/SupportingActress'
import { APIManager } from '../../utils'
import styles from './styles'
import { Link } from 'react-router'

class SupportingActresses extends Component{
  constructor(props){
    super(props)
    this.state={
      nomination:{
        supportingActressName:''
      },
      list:[]
    }
  }

  componentDidMount(){
		APIManager.get('/api/supportingactress',null,(err, response)=>{
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
		APIManager.post('/api/supportingActress', this.state.nomination, (err, response)=>{
			if (err || !res.ok) {
	       alert('Oh no! error');
	     } else {
	       console.log('supportingActress posted');
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
					 <Link to={"/actor/"+nomination.supportingActressName}>
					 	<SupportingActress idx={i+1} currentNomination={nomination} />
					 </Link>
				 </li>
       )
    })
    return(
			<div>
	      <div className="headline" style={{marginBottom:40}}>
	        <h4>Supporting<br />Actress:</h4>
				</div>
        <ul style={styles.nominations.other}>
          {listItem}
        </ul>
      </div>
    )
  }
}

export default SupportingActresses
