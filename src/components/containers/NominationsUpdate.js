import React, { Component } from 'react'
import { BestStunt, LeadActor, LeadActress, SupportingActor,SupportingActress, OutstandingEnsemble  } from '../presentation'
import superagent from 'superagent'
import styles from './styles'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class NominationsUpdate extends Component{
  constructor(props){
    super(props)
		this.restructureEnteredName = this.restructureEnteredName.bind(this)
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
    // console.log('MovieName: ' + JSON.stringify(this.props.list))
  }

  updateCategory(event){
    // console.log(this.state.category.title)

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

	restructureEnteredName(name){
		var nameArray = name.split(' ')
		var newNameArray = nameArray.map((letter)=> {
			return letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase()
		})
		var restructuredName = newNameArray.join(' ')
		return restructuredName
	}

  updateNomination(event){
    let updatedNomination = Object.assign({}, this.state.nomination)
		let category = this.restructureEnteredName(event.target.value)
		updatedNomination[this.state.category.nominationId] = category

    this.setState({
      nomination: updatedNomination
    })

  }

  submitNomination(event){
		console.log("EVENT: " + JSON.stringify(this.refs.nomination.value))
		if (this.refs.nomination.value==''){
			swal({
				title:"Oops!",
				text:"You must nominate a person or a movie",
				type:"error"
			})
			return
		}

    var url = '/api/'+(this.state.category.title).toLowerCase()
    let updatedList = Object.assign([],this.state.list)
    updatedList.push(this.state.nomination)

	  superagent
	  .post(url)
	  .send(this.state.nomination)
	  .set('Accept', 'application/json')
	  .end(function(err, res){
	    if (err || !res.ok) {
	      alert('Oh no! error');
	    } else {
	      swal({
					title:"Success",
					text:"Your nomination has been added",
					type:"success"
				})
	    }
	  });
	  this.setState({
	    list:updatedList
	  })
		this.refs.nomination.value=''
  }

  render(){
    return(
      <div >
        <h3>Make Nomination:</h3><br />
				<ul style={{listStyle: 'square'}}>
					<li>
						Please choose a Nomination Category
					</li>
					<li>
						For Lead and Supporting Categories:<br /> Please Type the Name of the Actor or Actress
					</li>
					<li>	
						For OutstandingEnsemble and Best Stunts:<br />Please type in the Name of the Movie
					</li>
				</ul><br />
        <h5>Nomination Category: (please select category)</h5>
        <select className="form-control" style={{backGround:'black',color:'#999'}} value={this.state.category.title} onChange={this.updateCategory.bind(this)}>
         <option value="leadActor">Lead Actor</option>
         <option value="leadActress">Lead Actress</option>
         <option value="supportingActor">Supporting Actor</option>
         <option value="supportingActress">Supporting Actress</option>
         <option value="bestStunts">Movie with Best Stunts</option>
         <option value="outstandingEnsemble">Movie with Most Outstanding Ensemble</option>
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
