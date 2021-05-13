import React from "react";
import { Container } from 'react-bootstrap';
import Welcome from "../components/Welcome";
import '../assets/styles/main.scss'

const Library: React.FC = () => {
    return(
        <Container fluid={true}>
           <Welcome />
          {/*  <LibraryContent />*/}
        </Container>
    )
};

export default Library;