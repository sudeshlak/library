import React from "react";
import { Container } from 'react-bootstrap';
import Welcome from "../components/Welcome";
import ReadingArea from "../components/ReadingArea";


const Library: React.FC = () => {
    return(

        <Container fluid={true}>
           <Welcome/>
          <ReadingArea/>
        </Container>

    )
};

export default Library;