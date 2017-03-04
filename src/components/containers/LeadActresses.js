import React, { Component } from 'react'
import LeadActress from '../presentation/LeadActress'
import { APIManager } from '../../utils'
import styles from './styles'
import { Link } from 'react-router'

class LeadActresses extends Component{
  constructor(props){
    super(props)
    this.state={
      nomination:{
        leadActressName:''
      },
      list:[]
    }
  }

  componentDidMount(){
		APIManager.get('/api/leadactress', null, (err, response)=>{
			if (err){
				alert('ERROR: '+err)
				return
			}
			let results = response.results
			console.log("NAME OF: " + JSON.stringify(results))
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
		APIManager.post('/api/leadactress', this.state.nomination, (err, response)=>{
			if (err || !res.ok) {
					 alert('Oh no! error');
				 } else {
					 console.log('leadactress posted');
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
					 <Link to={"/actor/"+nomination.leadActressName}>
					 		<LeadActress idx={i+1} currentNomination={nomination} />
					 </Link>
			 	</li>
       )
    })
    return(
			<div>
				<div className="headline" style={{marginBottom:40}}>
	        <h4>Lead<br />Actress:</h4>
					</div>
	        <ul style={styles.nominations.other}>
	          {listItem}
	        </ul>
      </div>
    )
  }
}

export default LeadActresses
