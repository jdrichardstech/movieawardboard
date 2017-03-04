import React from 'react'
import styles from './styles'

const LeadActor = (props)=>{
  return(
    <div>
        <span style={styles.a}>{props.idx}. {props.currentNomination.leadActorName}</span><br /><br />
    </div>
  )
}

export default LeadActor
