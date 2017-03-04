import React from 'react'
import styles from './styles'

const SupportingActress = (props)=>{
  return(
    <div>
        <span style={styles.a}>{props.idx}. {props.currentNomination.supportingActressName}</span><br /><br />
    </div>
  )
}

export default SupportingActress
