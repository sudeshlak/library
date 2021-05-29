import AuthorTitle from "./AuthorTitle";
import AuthorList from "./AuthorList";
import AddAuthor from "./AddAuthor";
import CreateAuthor from "./CreateAuthor";
import {IAuthors, IBooks} from "../../types/LibraryTypes";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";

type AuthorsProps = {
    authors: IAuthors[]
    setAuthors: (authors: IAuthors[]) => void
    books: IBooks[]
    setBooks: (books: IBooks[]) => void
}

const Authors: React.FC<AuthorsProps> = (props) => {
    const {setAuthors, authors, books, setBooks} = props;
    const [authorToUpdateIndex, setAuthorToUpdateIndex] = useState<number | null>(null);
    const [formVisible, setFormVisibility] = useState(false);

    const handleOnClickAddAuthor = () => {
        setFormVisibility(true);
        if (authorToUpdateIndex) {
            setAuthorToUpdateIndex(null);
        }
    }

    useEffect(() => {
        if (authorToUpdateIndex === null) {
            return;
        }
        setFormVisibility(true);
    }, [authorToUpdateIndex]);

    const handleOnAuthorDeleted = (index: number) => {
        const bAuthors: String[] = books.map(book => book.author);
        if (bAuthors.includes(authors[index].name)) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Author has been assigned to a book and cannot be Deleted',
                showConfirmButton: false,
                timer: 2000,
                toast: true
            }).then(() => {
            });
            return;
        }
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

                if (authorToUpdateIndex === index) {
                    setAuthorToUpdateIndex(null);
                    setFormVisibility(false);
                } else if (authorToUpdateIndex && authorToUpdateIndex > index) {
                    setAuthorToUpdateIndex(authorToUpdateIndex - 1);
                }
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Author Deleted',
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                }).then(() => {
                });
            }
        })
    };

    const handleUpdateAuthor = (updatedAuthor: IAuthors) => {
        if (authorToUpdateIndex === null) {
            return;
        }
        const allAuthors: IAuthors[] = authors.slice();
        allAuthors.splice(authorToUpdateIndex, 1, updatedAuthor);
        setAuthors(allAuthors);
        const allBooks: IBooks[] = books.slice();
        setBooks(
            allBooks.map((book) =>
                book.author === authors[authorToUpdateIndex].name ? {...book, author: updatedAuthor.name} : book
            )
        );
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Author Updated',
            showConfirmButton: false,
            timer: 1500,
            toast: true
        }).then(() => {
        });
        setAuthorToUpdateIndex(null);
        setFormVisibility(false);
    }

    const handleOnUpdateRequest = (index: number) => {
        setAuthorToUpdateIndex(index);
    }

    const handleOnFormClose = () => {
        setFormVisibility(false);
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
            toast: true,
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
        });
    };

    return (
        < >
            <AuthorTitle/>
            <AuthorList authors={props.authors}
                        onAuthorDeleted={handleOnAuthorDeleted}
                        onUpdateRequest={handleOnUpdateRequest}
            />
            <AddAuthor addClick={handleOnClickAddAuthor}/>
            {formVisible && <CreateAuthor onFormClose={handleOnFormClose}
                                          onAuthorAdded={handleAuthorAdded}
                                          authorToUpdate={authorToUpdateIndex !== null ? authors[authorToUpdateIndex] : null}
                                          onAuthorUpdated={handleUpdateAuthor}
                                          authors={props.authors}
            />}
        </>
    )
}

export default Authors
