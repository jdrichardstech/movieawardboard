import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions/actions'
import { APIManager } from '../../utils'
import ajax from 'superagent'
import { Link } from 'react-router'
import Header from '../containers/Header'
import Checkout from '../containers/CheckUser'
import DropZone from 'react-dropzone'
import sha1 from 'sha1'

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

	componentDidUpdate(){
		this.props.fetchCurrentUser(null)
		if(this.props.user!=null){
			this.context.router.push('/')
		}
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

	uploadImage(files){
	const image = files[0]
	console.log("COMMENT Container Image file: "+JSON.stringify(image))
	let timestamp = Date.now()/1000
	const cloudName= 'jdrichardstech'
	const uploadPreset='qfk6kfpf'
	const apiSecret = 'e8LAFbk1H23PLU02S5Og2DzsMYQ'
	const paramStr='timestamp='+timestamp+'&upload_preset='+uploadPreset+'e8LAFbk1H23PLU02S5Og2DzsMYQ'
	const signature=sha1(paramStr)
	const apiKey = '854536555581142'
	const params = {
		'api_key': apiKey,
		'timestamp':timestamp,
		'upload_preset':uploadPreset,
		'signature': signature
	}
    const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'
    APIManager.upload(url, image,params,(err, response)=>{
      if(err){
        console.log('Upload err: ' + err.message)
        return
      }
      console.log('Uploaded image: ' + JSON.stringify(response.body))
      const imageUrl = response.body['secure_url']

      let updatedProfile = Object.assign({}, this.state.profile)
      updatedProfile['profileImage'] = response.body['secure_url']
      this.setState({
        profile: updatedProfile
      })
  })
}

  render(){
		return(
			<div style={{background:'url(/assets/img/bg/oscar2.jpg) no-repeat',backgroundSize:'cover'}}>
				<div className="forms-wrapper">
          <div className="container content-md" style={{paddingTop:40}}>
            <div className="margin-bottom-6 head">
							<h1>Welcome to the Movie Awards Dashboard</h1>
							<h2>Login or Register an Account</h2>
            </div>
            <div className="row space-xlg-hor equal-height-columns">
              <div className="form-block login-block col-md-6 col-sm-12 rounded-left equal-height-column" style={{background:'rgba(105,196,199,0.5)'}}>
                <div className="form-block-header">
                  <h2 className="margin-bottom-20" style={{color:'white',paddingBottom:16}}>Sign In</h2>
                </div>
                <div className="input-group margin-bottom-20">
                  <span className="input-group-addon rounded-left" ><i style={{marginRight:10 }} className="icon-user color-white"></i></span>
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
              <div className="form-block reg-block col-md-6 col-sm-12 rounded-right equal-height-column" style={{paddingBottom:41,background:'rgba(51,51,51,0.8)'}}>
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
								<DropZone style={{color:'blue'}} onDrop={this.uploadImage.bind(this)}><a>Add Profile Image</a></DropZone><br />
                <div className="row">
                  <div className="col-md-12" >
                    <button onClick={this.submitProfile.bind(this)} type="submit" className="btn-u btn-block rounded">Register</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

			</div>
		)
  }
}

Account.contextTypes={
	router:PropTypes.object
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
