import React from "react";
import {Container} from "react-bootstrap";
import {Col, Row} from "react-bootstrap";
import {Twitter, Facebook, Instagram, Mail} from "react-feather";


const Footer: React.FC = () => {
    return (
        <Row className="footer-dark">
            <footer>
                <Container fluid={true}>
                    <Row>
                        <Col xs={12} md={3} className="item">
                            <h3>Services</h3>
                            <ul>
                                <li><a href="#">Web design</a></li>
                                <li><a href="#">Development</a></li>
                                <li><a href="#">Hosting</a></li>
                            </ul>
                        </Col>
                        <Col xs={12} md={3} className="item">
                            <h3>About</h3>
                            <ul>
                                <li><a href="#">Company</a></li>
                                <li><a href="#">Team</a></li>
                                <li><a href="#">Careers</a></li>
                            </ul>
                        </Col>
                        <Col xs={12} md={3} className="item">
                            <h3>Company Name</h3>
                            <p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut
                                vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit
                                pulvinar dictum vel in justo.</p>
                        </Col>
                        <Col xs={12} className="item">
                            <div className='social'>
                                <i><a href="www.facebook.com"> <Facebook/> </a></i>
                                <i><a href="www.twitter.com"> <Twitter/></a> </i>
                                <i><a href="www.instagram.com"> <Mail/></a> </i>
                                <i><a href="www.instagram.com"> <Instagram/></a> </i>
                            </div>

                        </Col>
                    </Row>
                    <p className="copyright">Sudesh Welikotuwa © 2018</p>
                </Container>
            </footer>
        </Row>
    );
}

export default Footer;

