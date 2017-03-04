import React from 'react'
import styles from './styles'

const OutstandingEnsemble = (props)=>{
  return(
    <div>
        <span style={styles.a}>{props.idx}. {props.currentNomination.outstandingEnsembleMovie}</span><br /><br />
    </div>
  )
}

export default OutstandingEnsemble
