import React from "react";
import {Col, Row} from "react-bootstrap";
import Author from "./Author";
import {IAuthors} from "../../types/LibraryTypes";

type AuthorsListProps = {
    authors: IAuthors[]
    onAuthorDeleted: (authorIndex: number) => void
    onUpdateRequest: (authorIndex: number) => void
}

const AuthorList: React.FC<AuthorsListProps> = (props) => {
    const {authors} = props;
    const renderAuthorList = () => {
        if (authors.length === 0) {
            return;
        }
        return authors.map((author: IAuthors, index: number) => {
            return <Author author={author} key={index} index={index + 1}
                           onAuthorDeleted={props.onAuthorDeleted}
                           onUpdateRequest={props.onUpdateRequest}
            />
        });
    };

    return (
        <div>
            <Row>
                <Col>
                    {authors.length === 0 && <label className='empty-list mb-2'>No authors listed here</label>}
                </Col>

                <ul className='author-book-ul'>
                    {renderAuthorList()}
                </ul>
            </Row>
        </div>
    );
}

export default AuthorList;