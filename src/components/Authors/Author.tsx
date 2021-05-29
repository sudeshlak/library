import React from "react";
import {Col, Row} from "react-bootstrap";
import {Trash2, Edit} from 'react-feather';
import {IAuthors} from "../../types/LibraryTypes";

type AuthorProps = {
    author: IAuthors,
    index: number
    onAuthorDeleted: (authorIndex: number) => void
    onUpdateRequest: (authorIndex: number) => void
}

const Author: React.FC<AuthorProps> = (props) => {
    const {author, index} = props;

    return (
        <li className='py-2'>
            <Row>
                <Col xs={8}>
                    <label>{index}. {author.name}</label>
                </Col>
                <Col xs={4} className='author-book-icons'>
                    <i onClick={() => props.onUpdateRequest(index - 1)}> <Edit className='text-warning'/> </i>
                    <i onClick={() => props.onAuthorDeleted(index - 1)}><Trash2 className='text-danger'/> </i>
                </Col>
            </Row>
        </li>
    );
}

export default Author;