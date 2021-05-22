import {Col, Row} from "react-bootstrap";
import Authors from "./Authors/Authors";
import {IAuthors} from "../types/LibraryTypes";
import React, {useEffect, useState} from "react";
import Swal from 'sweetalert2';

const LibraryContent: React.FC = () => {
    const authorsList: IAuthors [] = [{name: 'Author 1'}, {name: 'Author 2'}, {name: 'Author 3'}];
    const [authors, setAuthors] = useState(authorsList);
    const [authorToUpdate, setAuthorToUpdate] = useState<IAuthors | null>(null);
    const [authorToUpdateIndex, setAuthorToUpdateIndex] = useState<number | null>(null);
    const [formVisible, setFormVisibility] = useState(false);


    const handleOnClickAddAuthor = () => {
        setFormVisibility(true);
        if(authorToUpdate){
            setAuthorToUpdate(null);
            setAuthorToUpdateIndex(null);
        }
    }
    useEffect(() => {
        if (!authorToUpdate) {
            return;
        }
        setFormVisibility(true);
    }, [authorToUpdate]);

    const handleOnAuthorDeleted = (index: number) => {
        Swal.fire({
            title: 'Do you want delete :?',
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `NO`,
        }).then((result) => {
            if (result.isConfirmed) {
                const allAuthors: IAuthors[] = authors.slice();
                allAuthors.splice(index, 1);
                setAuthors(allAuthors);
                if(authorToUpdateIndex === index){
                    setAuthorToUpdate(null);
                    setAuthorToUpdateIndex(null);
                    setFormVisibility(false);
                }else if(authorToUpdateIndex && authorToUpdateIndex > index){
                    setAuthorToUpdateIndex(authorToUpdateIndex-1);
                }
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Author Deleted',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    };

    const handleUpdateAuthor = (updatedAuthor: IAuthors) => {
        const allAuthors: IAuthors[] = authors.slice();
        if (authorToUpdateIndex === null) {
            return;
        }
        allAuthors.splice(authorToUpdateIndex, 1, updatedAuthor);
        setAuthors(allAuthors);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Author Updated',
            showConfirmButton: false,
            timer: 1500
        });
        setAuthorToUpdate(null);
        setAuthorToUpdateIndex(null);
        setFormVisibility(false);
    }

    const handleOnUpdateRequest = (index: number) => {
        setAuthorToUpdate(authors[index]);
        setAuthorToUpdateIndex(index);
    }

    const handleOnFormClose = () => {
        setFormVisibility(false);
        setAuthorToUpdate(null);
        setAuthorToUpdateIndex(null);
    }

    const handleAuthorAdded = (author: IAuthors) => {
        const allAuthors: IAuthors[] = authors.slice();
        allAuthors.push(author);
        setAuthors(allAuthors);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'New Author Added',
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <Row className='reading-area'>
            <Col xs={{span: 12, order: 2}} md={{span: 6, order: 1}} className='bookSection'>
               books
            </Col>


            <Col xs={{span: 12, order: 1}} md={{span: 6, order: 1}} className='authorSection'>
                <Authors authors={authors}
                         onAuthorDeleted={handleOnAuthorDeleted}
                         onUpdateRequest={handleOnUpdateRequest}
                         onAuthorUpdated={handleUpdateAuthor}
                         authorToUpdate={authorToUpdate}
                         formVisible={formVisible}
                         onAuthorAdded={handleAuthorAdded}
                         onFormClose={handleOnFormClose}
                         onClickAddAuthor={handleOnClickAddAuthor}
                />
            </Col>

        </Row>
    )
}

export default LibraryContent;