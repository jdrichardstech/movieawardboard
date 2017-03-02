import React, { Component } from 'react'
import { Footer } from './presentation'

const Main = (props)=>{
	return(
		<div className="wrapper">
			{props.children}
			<Footer />
		</div>
	)
}

export default Main
