import React from 'react'

const Footer = (props)=>{
	return(
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
									<a href="http://www.github.com/jdrichardstech"  target="_blank" className="tooltips" data-toggle="tooltip" data-placement="top" title="" data-original-title="Github">
										<i className="fa fa-github"></i>
									</a>
								</li>

								<li>
									<a href="http://www.linkedin.com/in/jdrichardstech" target="_blank" className="tooltips" data-toggle="tooltip" data-placement="top" title="" data-original-title="Linkedin">
										<i className="fa fa-linkedin"></i>
									</a>
								</li>

								<li>
									<a href="http://www.twitter.com/jdrichardstech" target="_blank" className="tooltips" data-toggle="tooltip" data-placement="top" title="" data-original-title="Twitter">
										<i className="fa fa-twitter"></i>
									</a>
								</li>
							</ul>

						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer
