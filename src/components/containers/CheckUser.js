import React, { Component } from 'react'
import { MovieDBInfo, MovieNotes, Movies, Header, Account, NominationsUpdate } from '../containers'
import { SearchActor } from '../presentation'
import { connect } from 'react-redux'
import actions from '../../actions/actions'
import MainPage from '../layout/MainPage'


class Home extends Component{
	componentDidMount(){
		this.props.fetchCurrentUser(null)
	}

	render(){
		let content = null

			content = (this.props.user != null) ?
			<div>
				<Header />
				<MainPage />
		</div>
		: <Account />

		return(
		<div>

			{content}
		</div>
	)
}
}

const stateToProps = (state) => {
	return{
		user: state.account.user
	}
}

const dispatchToProps=(dispatch)=>{
	return{
		fetchCurrentUser: (params)=>dispatch(actions.fetchCurrentUser(params))
	}
}


export default connect(stateToProps, dispatchToProps)(Home)
