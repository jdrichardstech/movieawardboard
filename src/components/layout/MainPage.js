import React, { Component } from 'react'
import { MovieDBInfo, MovieNotes, Movies, Header, SearchActor, Account, NominationsUpdate } from '../containers'

const MainPage = () => {
	return(
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

	)
}

export default MainPage
