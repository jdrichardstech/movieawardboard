import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import actions from '../../actions/actions'
import { APIManager } from '../../utils'

class Header extends Component{
  constructor(props){
    super(props)
    this.state={

    }
  }

  componentDidMount(){
    // this.props.fetchCurrentUser(null)
  }

  logout(event){
	  event.preventDefault()
	  console.log('logout')

	  APIManager.get('/account/logout', null, (err, response) => {
	    if (err){
	      alert(err.message)
	      return
	    }
	    this.props.currentUserReceived(null)
			this.context.router.push('/')
	  })
	}


  render(){
    let content = null
		let imageProfile = null
    if(this.props.user == null){
      content = (
        <div>
          <ul className="loginbar pull-right">
          <li><Link to="/">Home</Link></li> |&nbsp;
            <li><Link to ='/nominations'>Nominations</Link></li> |&nbsp;
            <li><Link to = '/moviesnowplaying'>Current Releases</Link></li> |&nbsp;
          </ul>
        </div>
      )
    } else{

			// console.log("IMageProfile: " + JSON.stringify(this.props.user.profileImage))
			if(this.props.user.profileImage.length==0){
				imageProfile = "/assets/img/profileImg-placeholder.png"
			}else{
			imageProfile = this.props.user.profileImage
			}

      content =(
        <div>
          <ul className="loginbar pull-right">
          <li><Link to="/">Home</Link></li> |&nbsp;
            <li><Link to ='/nominations'>Nominations</Link></li> |&nbsp;
            <li><Link to = '/moviesnowplaying'>Current Releases</Link></li> |&nbsp;
           <a onClick={this.logout.bind(this)} style={{color:'gray', fontSize:'.8em'}} href='/'>Logout</a>
          </ul><br />
				<div className='pull-right' style={{paddingBottom:5}}>
							<img style={{height:30, width:30, borderRadius:30}} src={imageProfile} />&nbsp;
	            Username: <span style={{color:'#72c02c'}}>{this.props.user.username.toUpperCase()}</span>
	        </div>
        </div>
      )
    }


    return(
      <div>
	      <div className="header">
	        <div className="container" style={{backgroundColor:'black', width:'100%'}}>
	          <div className="topbar" style={{marginLeft:0}} >
	            {content}
	          </div>
	        </div>
	        <div className="collapse navbar-collapse mega-menu navbar-responsive-collapse">
	        </div>
	          <div className="container">

	          </div>

	        </div>
	        <div className="breadcrumbs-v1" >
	          <div className="container">
	            <h1 style={{color:'white'}}>MOVIE AWARDS</h1>
	            <span style={{color:'white'}}>Nomination Dashboard</span>
	          </div>
	        </div>
				</div>
    )
  }
}

Header.contextTypes={
	router: PropTypes.object
}

const stateToProps= (state) => {
  return{
    user:state.account.user
  }
}

const dispatchToProps= (dispatch) => {
  return{
    fetchCurrentUser: (params) => dispatch(actions.fetchCurrentUser(params)),
    currentUserReceived: (user) => dispatch(actions.currentUserReceived(user))
  }
}

export default connect(stateToProps, dispatchToProps)(Header)
