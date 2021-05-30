import React, {useEffect, useState} from "react";
import BookTitle from "./BookTitle";
import BooksList from "./BooksList";
import AddBook from "./AddBook";
import CreateBooks from "./CreateBooks";
import {IAuthors, IBooks} from "../../types/LibraryTypes";
import Swal from "sweetalert2";

type BooksProps = {
    authors: IAuthors[]
    books: IBooks[]
    setBooks: (books: IBooks[]) => void
}

const Books: React.FC<BooksProps> = (props) => {
    const {setBooks, books} = props;
    const [formVisible, setFormVisibility] = useState<false | true>(false);
    const [bookToUpdateIndex, setBookToUpdateIndex] = useState<number | null>(null);

    const handleOnFormOpen = () => {
        setBookToUpdateIndex(null);
        if (!formVisible) {
            setFormVisibility(true);
        }
    }

    const handleOnFormClose = () => {
        setFormVisibility(false);
        setBookToUpdateIndex(null);
    }

    const handleBookAdded = (bookAdd: IBooks) => {
        setBooks([...books, bookAdd]);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'New Book Added',
            toast: true,
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
        });
    }

    const handleOnDeleteBook = (index: number | null) => {
        if (index === null) {
            return;
        }
        Swal.fire({
            title: 'Do you want delete :?',
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `NO`,
        }).then((result) => {
            if (result.isConfirmed) {
                const allBooks: IBooks[] = books.slice();
                allBooks.splice(index, 1);
                setBooks(allBooks);

                if (bookToUpdateIndex) {
                    if (bookToUpdateIndex > index) {
                        setBookToUpdateIndex(bookToUpdateIndex - 1);

                    } else if (bookToUpdateIndex === index) {
                        setBookToUpdateIndex(null);
                        setFormVisibility(false);
                    }
                }
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Book Deleted',
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                }).then(() => {
                });
            }
        })
    }

    const HandleOnUpdateRequest = (bookIndex: number) => {
        setBookToUpdateIndex(bookIndex);
    }

    useEffect(() => {
        if (bookToUpdateIndex === null) {
            return;
        }
        setFormVisibility(true);
    }, [bookToUpdateIndex]);

    const handleUpdatedBook = (updatedBook: IBooks) => {
        const allBooks: IBooks[] = books.slice();
        if (bookToUpdateIndex === null) {
            return;
        }
        allBooks.splice(bookToUpdateIndex, 1, updatedBook);
        setBooks(allBooks);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Book Updated',
            showConfirmButton: false,
            timer: 1500,
            toast: true
        }).then(() => {
        });

        setBookToUpdateIndex(null);
        setFormVisibility(false);
    }
    return (
        <div>
            <BookTitle/>
            <BooksList bookList={books}
                       onBookDeleted={handleOnDeleteBook}
                       onUpdateRequest={HandleOnUpdateRequest}

            />
            <AddBook handleOnFormOpen={handleOnFormOpen}/>
            {formVisible && <CreateBooks authors={props.authors}
                                         handleOnFormClose={handleOnFormClose}
                                         onBookAdded={handleBookAdded}
                                         onBookUpdated={handleUpdatedBook}
                                         books={books}
                                         bookToUpdateIndex={bookToUpdateIndex}
            />}
        </div>
    );
}

export default Books;