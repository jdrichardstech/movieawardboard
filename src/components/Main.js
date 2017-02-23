import React, { Component } from 'react'

class Main extends Component{
  render(){
    return(
      <div className="wrapper">
        {this.props.children}
        <div className="footer-v1">
          <div className="copyright">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <p>
                  Copyright &copy;2017 <a href='#'>JDRichardsTech</a> All Rights Reserved.
                  </p>
                </div>
                <div className="col-md-6">
                  <ul className="footer-socials list-inline">
                    <li>
                      <a href="#" className="tooltips" data-toggle="tooltip" data-placement="top" title="" data-original-title="Facebook">
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="tooltips" data-toggle="tooltip" data-placement="top" title="" data-original-title="Skype">
                        <i className="fa fa-skype"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="tooltips" data-toggle="tooltip" data-placement="top" title="" data-original-title="Google Plus">
                        <i className="fa fa-google-plus"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="tooltips" data-toggle="tooltip" data-placement="top" title="" data-original-title="Linkedin">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="tooltips" data-toggle="tooltip" data-placement="top" title="" data-original-title="Pinterest">
                        <i className="fa fa-pinterest"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="tooltips" data-toggle="tooltip" data-placement="top" title="" data-original-title="Twitter">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="tooltips" data-toggle="tooltip" data-placement="top" title="" data-original-title="Dribbble">
                        <i className="fa fa-dribbble"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main
