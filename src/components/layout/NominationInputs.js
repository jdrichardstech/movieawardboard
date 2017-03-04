import React, { Component } from 'react'
import LeadActors from '../containers/LeadActors'
import LeadActresses from '../containers/LeadActresses'
import SupportingActors from '../containers/SupportingActors'
import SupportingActresses from '../containers/SupportingActresses'
import OutstandingEnsembles from '../containers/OutstandingEnsembles'
import BestStunts from '../containers/BestStunts'
import Header from '../containers/Header'
import { Link } from 'react-router'
import styles from './styles'

const NominationInputs = () => {
  return(
    <div>
			<Header />
	    <div className="container">
	      <div className="row">
	        <div className="col-md-12">
						<div style={{margin:'40px 0 0 0'}}>
	          <h1 style={{color:'#ccc', marginTop:40}}>Potential Nominations</h1>
	          <h4 style={{color:'#ccc'}}>Pick five from each category to nominate</h4><br /><br />
						</div>
					</div>
        </div>
      </div>
	      <div className="row" style={{padding:30}}>
	        <div className="col-md-12">
	          <div className="row">
	            <div style={styles.layout.nomination} className="col-md-2">
	              <LeadActors />
	            </div>
	            <div style={styles.layout.nomination} className="col-md-2">
	              <LeadActresses />
	            </div>
	            <div style={styles.layout.nomination} className="col-md-2">
	              <SupportingActors />
	            </div>
	            <div style={styles.layout.nomination} className="col-md-2">
	              <SupportingActresses />
	            </div>
	            <div style={styles.layout.nomination} className="col-md-2">
	              <OutstandingEnsembles />
	            </div>
	            <div style={styles.layout.nomination} className="col-md-2">
	              <BestStunts />
	            </div>
	          </div>
	        </div>
	      </div>
	    </div>

  )
}

export default NominationInputs
