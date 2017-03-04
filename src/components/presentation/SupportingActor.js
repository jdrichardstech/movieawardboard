import React from 'react'
import styles from './styles'

const SupportingActor = (props)=>{
  return(
    <div>
        <span style={styles.a}>{props.idx}. {props.currentNomination.supportingActorName}</span><br /><br />
    </div>
  )
}

export default SupportingActor
