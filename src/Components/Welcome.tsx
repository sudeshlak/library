import React from 'react';
import {Col, Image, Navbar, Row} from "react-bootstrap";
import WelcomeImage from '../assets/images/welcome-image.webp';
import NavBar from "./NavBar";

const Welcome: React.FC = () => {
  return (
      <Row className='welcome-section'>
        <Col xs={12} className='text-center py-2'>
          <h1>My Library</h1>
        </Col>
        <Col><NavBar/></Col>
        <Col xs={12} className='welcome-image px-0'>
          <Image src={WelcomeImage}/>
        </Col>
        <Col xs={12} className='img-credit'>
          Photo by <a
            href="https://unsplash.com/@annahunko?utm_source=unsplash&utm_medium=
                referral&utm_content=creditCopyText">
          Anna Hunko</a> on <a
            href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash</a>
        </Col>
      </Row>
  )
};

export default Welcome;