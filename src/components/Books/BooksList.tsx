import React from "react";
import {Col, Row} from "react-bootstrap";
import Book from "./Book";
import {IBooks} from "../../types/LibraryTypes";

type BooksListProps = {
    bookList: IBooks[]
    onBookDeleted: (bookIndex: number) => void
    onUpdateRequest: (bookIndex: number) => void
}

const BooksList: React.FC<BooksListProps> = (props) => {
    const renderBookList = () => {
        if (props.bookList.length === 0) {
            return;
        }
        return props.bookList.map((book: IBooks, index: number) => {
            return <Book book={book} key={index} index={index + 1}
                         onBookDeleted={props.onBookDeleted}
                         onUpdateRequest={props.onUpdateRequest}
            />
        });
    }
    return (
        <Row>
            <Col>
                {props.bookList.length === 0 && <label className='empty-list mb-2'>No books listed here</label>}
            </Col>
            <ul className='author-book-ul'>
                {renderBookList()}
            </ul>
        </Row>
    );
}

export default BooksList;