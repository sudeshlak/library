import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {XCircle} from "react-feather";
import Select from 'react-select/creatable';
import {IAuthors, AuthorsInDropDown, IBooks} from "../../types/LibraryTypes";
import NumberFormat from 'react-number-format';
import Swal from "sweetalert2";

type BooksProps = {
    authors: IAuthors[]
    handleOnFormClose: () => void
    onBookAdded: (bookAdd: IBooks) => void
    onBookUpdated: (bookUpdated: IBooks) => void
    books: IBooks[]
    bookToUpdateIndex: number | null
}

const CreateBook: React.FC<BooksProps> = (props) => {
    const {authors, books, bookToUpdateIndex} = props;
    const [name, setName] = useState<string | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [inputAuthor, setAuthor] = useState<null | AuthorsInDropDown>(null);
    const [validated, setValidated] = useState(false);
    const [authorsOfOptionList, SetAuthorsOfOptionList] = useState<null | AuthorsInDropDown[]>(null);

    const styleSelect: any = {
        container: (base: any) => ({
            ...base,
            backgroundColor: '#959595',
            padding: 2,
        }),
        control: (base: any) => ({
            ...base,
            border: 0,
        }),
    }

    const themeSelect: any = (theme: any) => {
        return {
            ...theme,
            borderRadius: 0,
            borderWidth: 2,
            colors: {
                ...theme.colors,
                primary25: '#f5f5f5',
                primary: '#959595',
            },
        }
    }

    useEffect(() => {
        if (!authors||authors.length===undefined) {
            return;
        }
        const dropDowns: AuthorsInDropDown[] = authors.map(
            (author) => {
                return {value: author.name, label: author.name}
            });
        SetAuthorsOfOptionList(dropDowns);
    }, [authors]);

    const handleOnBookNameChanged = (name: string) => {
        setName(name);
    }

    const handleOnPriceChanged = (price: number | undefined) => {
        if (!price) {
            setPrice(null);
        } else {
            setPrice(price);
        }
    }

    const handleOnAuthorChanged = (author: null | AuthorsInDropDown) => {
        setAuthor(author);
    }

    const isInBooks = (booksName: string) => {
        const bBooks: String[] = books.map(author => author.name);
        return bBooks.indexOf(booksName);
    }

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.stopPropagation();
        }
        setValidated(true);
        if (!name || name === "" || !price || price <= 0 || !inputAuthor) {
            return;
        }
        if (bookToUpdateIndex) {
            if (isInBooks(name) > -1 && isInBooks(name) !== bookToUpdateIndex) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Book already exists',
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true
                }).then(() => {
                });
                return;
            }
            const updatedBook: IBooks = {
                ...books[bookToUpdateIndex],
                name: name,
                price: price,
                author: inputAuthor.value
            };
            props.onBookUpdated(updatedBook);
            return;
        }
        if (isInBooks(name) > -1) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Book already exists',
                showConfirmButton: false,
                timer: 2000,
                toast: true
            }).then(() => {
            });
            return;
        }
        const addBook :IBooks = {name, price,author:inputAuthor.value};
        props.onBookAdded(addBook);
        setValidated(false);
        setName('');
        setPrice(null);
        setAuthor(null);
    }

    useEffect(() => {
        if (bookToUpdateIndex === null) {
            setName('');
            setPrice(null);
            setAuthor(null);
            return;
        }
        setName(books[bookToUpdateIndex].name);
        setPrice(books[bookToUpdateIndex].price);
        const goingToUpdateAuthor: AuthorsInDropDown = {
            value: books[bookToUpdateIndex].author,
            label: books[bookToUpdateIndex].author
        }
        setAuthor(goingToUpdateAuthor);
    }, [bookToUpdateIndex]);

    return (
        <Row className='create-author-book mx-3 my-5'>
            <Col xs={12} md={11} lg={8}>
                <Row>
                    <Col xs={10}>
                        <h3>{bookToUpdateIndex !== null ? "Update Book" : "Create Book"}</h3>
                    </Col>
                    <Col xs={2} className='form-close-button'>
                        <i onClick={props.handleOnFormClose}><XCircle/></i>
                    </Col>
                </Row>
                <Row>
                    <Col className='my-4'>
                        <Form className='form-inputs' noValidate validated={validated} onSubmit={handleOnSubmit}>
                            <Form.Group controlId="bookName">
                                <Form.Label>Title of the Book</Form.Label>
                                <Form.Control type="text"
                                              placeholder=""
                                              required
                                              value={name ? name : ''}
                                              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                  handleOnBookNameChanged(event.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Book Name.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <NumberFormat thousandSeparator={true}
                                              className='form-control'
                                              prefix={'$'}
                                              required
                                              value={price ? price : ''}
                                              placeholder=""
                                              onValueChange={(values) => {
                                                  handleOnPriceChanged(values.floatValue)
                                              }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Price.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="authorName">
                                <Form.Label>Author</Form.Label>
                                <Select
                                    value={inputAuthor}
                                    onChange={(selected: AuthorsInDropDown | null) => {
                                        handleOnAuthorChanged(selected)
                                    }}
                                    allowCreateWhileLoading
                                    options={authorsOfOptionList ? authorsOfOptionList : undefined}
                                    isClearable={true}
                                    isSearchable={false}
                                    theme={themeSelect}
                                    styles={styleSelect}
                                />
                            </Form.Group>
                            {(!inputAuthor && validated) &&
                            <span className='select-invalid'>
                                Please select an Author.
                            </span>}
                            <Button type="submit"
                                    className='create-btn mt-3 py-1 px-4'>{bookToUpdateIndex ? "Update" : "Create"}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default CreateBook;