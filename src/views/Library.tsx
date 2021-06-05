import React from "react";
import {Container} from 'react-bootstrap';
import Welcome from "../Components/Welcome";
import ReadingArea from "../Components/ReadingArea";
import Footer from "../Components/Footer";
import About from "../Components/About";
import Contact from "../Components/Contact";
import {BrowserRouter, Route, Switch} from "react-router-dom";

const Library: React.FC = () => {
  return (
      <Container fluid={true}>
        <BrowserRouter>
          <Welcome/>
          <Switch>
            <Route path="/about"><About/></Route>
            <Route path="/contact"><Contact/></Route>
            <Route path="/"><ReadingArea/></Route>
          </Switch>
          <Footer/>
        </BrowserRouter>
      </Container>
  )
};

export default Library;