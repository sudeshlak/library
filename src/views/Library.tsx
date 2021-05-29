import React from "react";
import {Container} from 'react-bootstrap';
import Welcome from "../components/Welcome";
import ReadingArea from "../components/ReadingArea";
import Footer from "../components/Footer";


const Library: React.FC = () => {
    return (
        <Container fluid={true}>
            <Welcome/>
            <ReadingArea/>
            <Footer/>
        </Container>
    )
};

export default Library;