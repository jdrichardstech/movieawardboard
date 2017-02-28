import React, { Component } from 'react'
import { Footer } from './presentation'

class Main extends Component{
  render(){
    return(
      <div className="wrapper">
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default Main
