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
	          <h1>Potential Nominations</h1>
	          <h3>Pick five from each category to nominate</h3><br /><br />
	        </div>
	      </div>
	      <div className="row">
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
	  </div>
  )
}

export default NominationInputs
