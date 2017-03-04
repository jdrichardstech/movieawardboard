import React from 'react'
import styles from './styles'

const LeadActress = (props)=>{
  return(
    <div>
        <span style={styles.a}>{props.idx}. {props.currentNomination.leadActressName}</span><br /><br />
    </div>
  )
}

export default LeadActress
