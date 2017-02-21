import React, { Component } from 'react'
import SupportingActress from '../presentation/SupportingActress'
import superagent from 'superagent'
import styles from './styles'


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
		superagent
		.get('/api/supportingactress')
		.query(null)
		.set('Accept', 'application/json')
		.end((err, response) => {
			if (err){
				alert('ERROR: '+err)
				return
			}

			let results = response.body.results

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


	  superagent
	  .post('/api/supportingActress')
	  .send(this.state.nomination)
	  .set('Accept', 'application/json')
	  .end(function(err, res){
	    if (err || !res.ok) {
	      alert('Oh no! error');
	    } else {
	      console.log('supportingActress');
	    }
	  });
	  this.setState({
	    list:updatedList
	  })
  }

  render(){
    var listItem = this.state.list.map((nomination, i)=>{
      return(
         <li key={i}><SupportingActress currentNomination={nomination} /></li>
       )
    })
    return(
      <div style={styles.nominations.border}>
        <h4>Supporting Actress:</h4>
        <ol style={styles.nominations.other}>
          {listItem}
        </ol>
      {/*   <input onChange ={this.updateNomination.bind(this)} className="form-control" type="text" id="supportingActressName" placeholder="Supporting Actor" /><br />
        <button style={{marginBottom:20}}  onClick={this.submitNomination.bind(this)} className="btn btn-success">Nominate</button>
        */}
      </div>
    )
  }
}

export default SupportingActresses
