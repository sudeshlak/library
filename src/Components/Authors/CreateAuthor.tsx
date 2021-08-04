import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {XCircle} from "react-feather";
import {IAuthors} from "../../types/LibraryTypes";
import Swal from "sweetalert2";

type createAuthorProps = {
    onFormClose: () => void
    onAuthorAdded: (author: IAuthors) => void
    authorToUpdate: IAuthors | null
    onAuthorUpdated: (updatedAuthor: IAuthors) => void
    authors: IAuthors[]
}

const CreateAuthor: React.FC<createAuthorProps> = (props) => {
    const {authorToUpdate, authors} = props;
    const [authorName, setAuthorName] = useState<string | null>(null);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (!authorToUpdate) {
            setAuthorName(null);
            return;
        }
        setAuthorName(authorToUpdate.name);
    }, [authorToUpdate]);

    const handleOnAuthorNameChanged = (name: string) => {
        setAuthorName(name);
    }
    const isInAuthors = (authorName: string) => {
        if (authors.length===undefined||authors.length===0){
            return ;
        }
        const bAuthors: String[] = authors.map(author => author.name);
        return bAuthors.includes(authorName);
    }

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.stopPropagation();
        }
        setValidated(true);
        if (!authorName || authorName === '') {
            return;
        }
        if (isInAuthors(authorName)) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Author already exists',
                showConfirmButton: false,
                timer: 2000,
                toast: true
            }).then(() => {
            });
            return;
        }
        if (authorToUpdate) {
            const updatedAuthor: IAuthors = {...authorToUpdate, name: authorName}
            props.onAuthorUpdated(updatedAuthor);
            setAuthorName('');
            return;
        }
        const newAuthor: IAuthors = {name: authorName};
        props.onAuthorAdded(newAuthor);
        setAuthorName('');
        setValidated(false);
    }

    return (
        <Row className='create-author-book mx-3 my-5'>
            <Col xs={12} md={11} lg={8}>
                <Row>
                    <Col xs={10}>
                        <h3>{authorToUpdate ? 'Update' : 'Create'} Author</h3>
                    </Col>
                    <Col xs={2} className='form-close-button'>
                        <i><XCircle onClick={props.onFormClose}/></i>
                    </Col>
                </Row>
                <Row>
                    <Col className='my-4'>
                        <Form className='form-inputs' noValidate validated={validated} onSubmit={handleOnSubmit}>
                            <Form.Group controlId="authorName">
                                <Form.Label>Name of Author</Form.Label>
                                <Form.Control type="text" placeholder=""
                                              value={authorName ? authorName : ''}
                                              required
                                              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                  handleOnAuthorNameChanged(event.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Author Name.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button className='create-btn mt-3 py-1 px-4' type='submit'>
                                {authorToUpdate ? 'Update' : 'Create'}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default CreateAuthor;