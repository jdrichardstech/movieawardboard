import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions/actions'
import { APIManager } from '../../utils'
import ajax from 'superagent'
import { Link } from 'react-router'
import Header from '../containers/Header'

class Account extends Component{
  constructor(props){
    super(props)
    this.state={
      profile:{
        username:'',
        password:'',
        email:'',
        profileImage:''
      },
      movies:[]
    }
  }

  componentDidMount(){
    this.props.fetchCurrentUser(null)
  }

  updateProfile(event){
    // console.log("Update Profile: " + event.target.value)
    let updatedProfile= Object.assign({}, this.state.profile)
    updatedProfile[event.target.id] = event.target.value
    this.setState({
      profile: updatedProfile
    })
  }

  submitProfile(event){
      this.props.createUser(this.state.profile)
  }

  submitLogin(event){
    this.props.createLogin(this.state.profile)
  }

  render(){
    let content = null

    if(this.props.user != null){
      content=(
        <div>
            <Header />
            <br /><br />
            <div style={{textAlign:'center'}}>
            <h1>Hi <span style={{color:'#72c02c'}}>{this.props.user.username.toUpperCase()}</span></h1>
            <h3>You are logged in</h3>
            <button className="btn btn-primary"><Link to='/'>Go to DashBoard</Link></button>
            </div>
            <br /><br /><br />
        </div>
      )
    }else{
      content=(
        <div className="forms-wrapper">
          <div className="container content-md">
            <div className="margin-bottom-60 head">
              <h1>Welcome to the Movie Awards Dashboard</h1>
              <h2>Login or Register an Account</h2>
            </div>
            <div className="row space-xlg-hor equal-height-columns">
              <div className="form-block login-block col-md-6 col-sm-12 rounded-left equal-height-column">
                <div className="form-block-header">
                  <h2 className="margin-bottom-20" style={{color:'white'}}>Sign In</h2>
                </div>
                <div className="input-group margin-bottom-20">
                  <span className="input-group-addon rounded-left"><i style={{marginRight:10}} className="icon-user color-white"></i></span>
                  <input onChange={this.updateProfile.bind(this)} id="username"  type="text" className="form-control rounded-right" placeholder="Username" />
                </div>
                <div className="input-group margin-bottom-20">
                  <span className="input-group-addon rounded-left"><i style={{marginRight:10}} className="icon-lock color-white" ></i></span>
                  <input onChange={this.updateProfile.bind(this)} id="password" type="password" className="form-control rounded-right"  placeholder="Password" />
                </div>
                <div className="row margin-bottom-70">
                  <div className="col-md-12">
                    <button onClick={this.submitLogin.bind(this)} type="submit" className="btn-u btn-block rounded">Sign In</button>
                  </div>
                </div>
              </div>
              <div className="form-block reg-block col-md-6 col-sm-12 rounded-right equal-height-column" style={{paddingBottom:71}}>
                <div className="form-block-header">
                  <h2 className="margin-bottom-10">Sign Up</h2>
                </div>
                <div className="input-group margin-bottom-20">
                  <span className="input-group-addon rounded-left"><i style={{marginRight:10, color:'white'}} className="icon-user color-white"></i></span>
                  <input onChange={this.updateProfile.bind(this)} id="username" type="text"  className="form-control rounded-right" placeholder="Username"/>
                </div>
                <div className="input-group margin-bottom-20">
                  <span className="input-group-addon rounded-left"><i style={{marginRight:10, color:'white'}} className="icon-envelope color-white"></i></span>
                  <input onChange={this.updateProfile.bind(this)} id="email" type="text" className="form-control rounded-right" placeholder="Your email"/>
                </div>
                <div className="input-group margin-bottom-20">
                  <span className="input-group-addon rounded-left"><i style={{marginRight:10, color:'white'}} className="icon-lock color-white"></i></span>
                  <input onChange={this.updateProfile.bind(this)} id="password" type="password" className="form-control rounded-right" placeholder="Password" />
                </div>
                <div className="row">
                  <div className="col-md-12" >
                    <button onClick={this.submitProfile.bind(this)} type="submit" className="btn-u btn-block rounded">Continue</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return(
      <div>
        {content}
      </div>
    )
  }
}

const stateToProps=(state)=>{
  return{
    user:state.account.user
  }
}

const dispatchToProps=(dispatch)=>{
  return{
    createUser: (params) => dispatch(actions.createUser(params)),
    createLogin: (params) => dispatch(actions.createLogin(params)),
    fetchCurrentUser: (params) => dispatch(actions.fetchCurrentUser(params))
  }
}

export default connect(stateToProps, dispatchToProps)(Account)
