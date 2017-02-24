import React, { Component } from 'react'
import { BestStunt, LeadActor, LeadActress, SupportingActor,SupportingActress, OutstandingEnsemble  } from '../presentation'
import superagent from 'superagent'
import styles from './styles'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class NominationsUpdate extends Component{
  constructor(props){
    super(props)
    this.state={

      category:{
        title:'leadactor',
        nominationId:'leadActorName'

      },
      nomination:{
        bestStuntsMovie:'',
        leadActorName:'',
        leadActressName:'',
        outstandingEnsembleMovie:'',
        supportingActorName:'',
        supportingActressName:''

      },
      list:[]
    }
  }

  componentDidMount(){
    console.log('MovieName: ' + JSON.stringify(this.props.list))
  }

  updateCategory(event){
    console.log(this.state.category.title)

    let updatedCategory=Object.assign({}, this.state.category)
    updatedCategory['title'] = (event.target.value)

    switch(event.target.value){
      case 'leadActor':
        updatedCategory['nominationId']='leadActorName'
        // console.log(updatedCategory['nominationId'])
        break;
      case 'leadActress':
        updatedCategory['nominationId']='leadActressName'
        // console.log(updatedCategory['nominationId'])
        break;
      case 'supportingActor':
        updatedCategory['nominationId']='supportingActorName'
        // console.log(updatedCategory['nominationId'])
        break;
      case 'supportingActress':
        updatedCategory['nominationId']='supportingActressName'
        // console.log(updatedCategory['nominationId'])
        break;
      case 'outstandingEnsemble':
        updatedCategory['nominationId']='outstandingEnsembleMovie'
        // console.log(updatedCategory['nominationId'])
        break;
      case 'bestStunts':
      updatedCategory['nominationId']='bestStuntsMovie'
      // console.log('best stunts: ' +updatedCategory['nominationId'])
      break;
      default:
      console.log('no selected category')
    }

    this.setState({
      category: updatedCategory
    })
  }

	updateNomination(event){
	let updatedNomination = Object.assign({}, this.state.nomination)
	updatedNomination[this.state.category.nominationId] = event.target.value
	this.setState({
		nomination: updatedNomination,
	})
}



  submitNomination(event){
    // console.log('Submit: ' + this.state.category.title)
    var url = '/api/'+(this.state.category.title).toLowerCase()
    let updatedList = Object.assign([],this.state.list)
    updatedList.push(this.state.nomination)

	  superagent
	  .post(url)//this can be replaced with /api/this.state.category.title
	  .send(this.state.nomination)
	  .set('Accept', 'application/json')
	  .end(function(err, res){
	    if (err || !res.ok) {
	      alert('Oh no! error');
	    } else {
	      alert('Nomination Has Been Added')
	    }
	  });
	  this.setState({
	    list:updatedList
	  })
		this.refs.nomination.value=''
  }


  render(){


  {/*}  var listItem = this.state.list.map((nomination, i)=>{
      return(
         <li key={i}><BestStunt currentNomination={nomination} /></li>
         ,{/*figure out here how to send to the correct component
       )
    })*/}

    return(
      <div >

        {/*}<ul style={styles.nominations.list}>
          {listItem}
        </ul>*/}
        <h3>Make Nomination:</h3><br />
        <h5>Nomination Category: (please select category)</h5>
        <select className="form-control" style={{backGround:'black',color:'#999'}} value={this.state.category.title} onChange={this.updateCategory.bind(this)}>
         <option value="leadActor">Lead Actor</option>
         <option value="leadActress">Lead Actress</option>
         <option value="supportingActor">Supporting Actor</option>
         <option value="supportingActress">Supporting Actress</option>
         <option value="bestStunts">Best Stunts</option>
         <option value="outstandingEnsemble">Outstanding Ensemble</option>
     		</select>
     		<br /><br />
				<label><h5>Enter Name or Movie:</h5></label>
        <input onChange ={this.updateNomination.bind(this)} className="form-control" type="text" ref="nomination" id={this.state.category.nominationId} /><br />
        <button style={styles.nominations.button}  onClick={this.submitNomination.bind(this)}  className="btn btn-success">Nominate</button> &nbsp;
        <Link to = "/nominations"><button style={styles.nominations.button}  type="" className="btn btn-info">View Nominations</button></Link>
      	<br />
      </div>
    )
  }
}

const stateToProps = (state) => {
  return{
    list: state.movies.list
  }
}

export default connect(stateToProps)(NominationsUpdate)
