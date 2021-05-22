import React, {FormEvent, useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {XCircle} from "react-feather";
import Select from 'react-select/creatable';
import {IAuthors, AuthorsInDropDown, IBooks} from "../../types/LibraryTypes";
import Swal from "sweetalert2";

type BooksProps = {
    authors: IAuthors[]
    handleOnFormClose: () => void
    onBookAdded: (name: string, isbn: string, author: string) => void
    bookToUpdate: IBooks | null
    onBookUpdated: (bookUpdated: IBooks) => void
}
const CreateBook: React.FC<BooksProps> = (props) => {
    const {authors} = props;

    const authorsOfOptionList: AuthorsInDropDown[] = authors.map(
        (author) => {
            return {value: author.name, label: author.name}
        });
    const [name, setName] = useState<string | null>(null);
    const [isbn, setIsbn] = useState<string | null>(null);
    const [inputAuthor, setAuthor] = useState<null | AuthorsInDropDown>(null);

    const handleOnBookNameChanged = (name: string) => {
        setName(name);
    }
    const handleOnIsbnChanged = (isbn: string) => {
        setIsbn(isbn);
    }
    const handleOnAuthorChanged = (author: null | AuthorsInDropDown) => {
        setAuthor(author);
    }
    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (!name || name === "" || !isbn || isbn === "" || !inputAuthor) {
            if (!name || name === "") {
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Book name is not valid',
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });
            }else if (!isbn || isbn === "") {
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'ISBN is not valid',
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });

            }else if (!inputAuthor) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Author name is not valid',
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });
            }
            return;
        }
        if (props.bookToUpdate) {
            const updatedBook: IBooks = {...props.bookToUpdate, name: name, isbn: isbn, author: inputAuthor.value};
            props.onBookUpdated(updatedBook);
            return;
        }
        props.onBookAdded(name, isbn, inputAuthor.value);
        setName('');
        setIsbn('');
        setAuthor(null);
    }

    useEffect(() => {
        if (!props.bookToUpdate) {
            setName('');
            setIsbn('');
            setAuthor(null);
            return;
        }
        setName(props.bookToUpdate.name);
        setIsbn(props.bookToUpdate.isbn);
        const goingToUpdateAuthor: AuthorsInDropDown = {
            value: props.bookToUpdate.author,
            label: props.bookToUpdate.author
        }
        setAuthor(goingToUpdateAuthor);
    }, [props.bookToUpdate])

    return (
        <Row className='create-author-book mx-3 my-5'>
            <Col xs={12} md={10} lg={8}>
                <Row>
                    <Col xs={10}>
                        <h3>{props.bookToUpdate ? "Update Book" : "Create Book"}</h3>
                    </Col>
                    <Col xs={2} className='formCloseButton'>
                        <i onClick={props.handleOnFormClose}><XCircle/></i>
                    </Col>
                </Row>
                <Row>
                    <Col className='my-4'>
                        <Form className='formInputs' onSubmit={handleOnSubmit}>
                            <Form.Group controlId="bookName">
                                <Form.Label>Title of the Book</Form.Label>
                                <Form.Control type="text"
                                              placeholder=""
                                              value={name ? name : ''}
                                              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                  handleOnBookNameChanged(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="isbn">
                                <Form.Label>ISBN</Form.Label>
                                <Form.Control type="text"
                                              value={isbn ? isbn : ''}
                                              placeholder=""
                                              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                  handleOnIsbnChanged(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="authorName">
                                <Form.Label>Author</Form.Label>
                                <Select

                                    value={inputAuthor}
                                    onChange={(selected: AuthorsInDropDown | null) => {
                                        handleOnAuthorChanged(selected)
                                    }}
                                    allowCreateWhileLoading
                                    options={authorsOfOptionList}
                                    isClearable={true}
                                    isSearchable={false}
                                    theme={theme => ({
                                        ...theme,
                                        borderRadius: 0,
                                        borderWidth: 2,
                                        colors: {
                                            ...theme.colors,
                                            primary25: '#f5f5f5',
                                            primary: '#959595',
                                        },
                                    })}
                                    styles={{
                                        container: base => ({
                                            ...base,
                                            backgroundColor: '#959595',
                                            padding: 2,
                                        }),
                                        control: base => ({
                                            ...base,
                                            border: 0,
                                        }),
                                    }}
                                />
                            </Form.Group>
                            <Button type="submit"
                                    className='create-btn mt-3 py-1 px-4'>{props.bookToUpdate ? "Update" : "Create"}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default CreateBook;