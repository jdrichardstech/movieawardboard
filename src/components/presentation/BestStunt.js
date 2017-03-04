import React from 'react'
import styles from './styles'

const BestStunt = (props)=>{
  return(
    <div>
        <span style={styles.a}>{props.idx}. {props.currentNomination.bestStuntsMovie}</span><br /><br />
    </div>
  )
}

export default BestStunt
