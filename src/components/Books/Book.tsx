import React from "react";
import {Col, Row} from "react-bootstrap";
import {Trash2, Edit} from 'react-feather';
import {IBooks} from "../../types/LibraryTypes";

type AuthorProps = {
    book: IBooks
    index: number
    onBookDeleted: (authorIndex: number) => void
    onUpdateRequest: (authorIndex: number) => void
}

const Book: React.FC<AuthorProps> = (props) => {
    return (
        <li key={props.index} className='py-2'>
            <Row>
                <Col xs={8}>
                    <label>{props.index}. {props.book.name}</label>
                </Col>
                <Col xs={4} className='author-book-icons'>
                    <i> <Edit className='text-warning' onClick={() => props.onUpdateRequest(props.index - 1)}/> </i>
                    <i><Trash2 className='text-danger ' onClick={() => props.onBookDeleted(props.index - 1)}/> </i>
                </Col>
            </Row>
        </li>
    );
}

export default Book;