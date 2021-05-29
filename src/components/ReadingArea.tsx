import {Col, Row} from "react-bootstrap";
import Authors from "./Authors/Authors";
import {IAuthors, IBooks} from "../types/LibraryTypes";
import React, {useState} from "react";
import Books from "./Books/Books";


const LibraryContent: React.FC = () => {
    const authorsList: IAuthors [] = [{name: 'Author 1'}, {name: 'Author 2'}, {name: 'Author 3'}];
    const [authors, setAuthors] = useState(authorsList);
    const bookList: IBooks[] = [{name: 'book 1', price: 250.60, author: 'Author 1'},
        {
            name: 'book 2',
            price: 250.60,
            author: 'Author 2'
        }, {name: 'book 3', price: 250.60, author: 'Author 3'}];

    const [books, setBooks] = useState(bookList);


    return (
        <Row className='reading-area'>
            <Col xs={{span: 12, order: 2}} md={{span: 6, order: 1}} className='book-section'>
                <Books
                    authors={authors}
                    books={books}
                    setBooks={setBooks}
                />
            </Col>
            <Col xs={{span: 12, order: 1}} md={{span: 6, order: 1}} className='author-section'>
                <Authors authors={authors}
                         setAuthors={setAuthors}
                         books={books}
                         setBooks={setBooks}
                />
            </Col>

        </Row>
    )
}

export default LibraryContent;