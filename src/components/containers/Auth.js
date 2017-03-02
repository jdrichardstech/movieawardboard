import React, { Component,PropTypes  } from 'react'

import { connect } from 'react-redux'

export default function (ComposedComponent) {
  class Auth extends Component {

		componentDidMount(){
			if(this.props.user ==null){
				this.context.router.push('/account')
			}
		}

		componentWillUpdate(){
			if(this.props.user==null){
				this.context.router.push('/account')
				return
			}
			if(this.props.user!=null){
				this.context.router.push('/')
				return
			}
		}
		render(){
			return(
				<ComposedComponent {...this.props}  />
			)
		}
	}

	Auth.contextTypes ={
		router: PropTypes.object
	}
	const stateToProps = (state) =>{
		return{
			user:state.account.user
		}
	}
	return connect(stateToProps)(Auth)
}
