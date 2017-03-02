import React, { Component } from 'react'
// import Movies from '../containers/Movies'
// import MovieNotes from '../containers/MovieNotes'
import { MovieDBInfo, MovieNotes, Movies, Header, SearchActor, Account } from '../containers'
import NominationsUpdate from '../containers/NominationsUpdate'
import { connect } from 'react-redux'
import actions from '../../actions/actions'


class Home extends Component{
	componentDidMount(){
		this.props.fetchCurrentUser(null)
	}

	render(){
		let content = null

			content = (this.props.user != null) ?
			<div>
				<Header />
				<div className="bg-color-light">
					<div className="container content-sm">
							<div className="row">
								<div className="col-md-3">
								<Movies />
								</div>
								<div className="col-md-9">
									<div className="row news-v2 margin-bottom-50">
										<div className="col-sm-6 sm-margin-bottom-30">
											<div className="news-v2-badge" style={{backgroundColor:'black'}}>
											</div>
											<div className="news-v2-desc">
													<MovieDBInfo />
													<MovieNotes />
											</div>
										</div>
										<div className="col-sm-6">

											<div className="news-v2-desc" style={{marginBottom:30}}>
													<NominationsUpdate />
											</div>
											<div className="news-v2-desc">
													<SearchActor />
											</div>
										</div>
									</div>
								</div>
							</div>
					</div>
			</div>
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
