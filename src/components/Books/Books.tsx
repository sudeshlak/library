import React, {useEffect, useState} from "react";
import BookTitle from "./BookTitle";
import BooksList from "./BooksList";
import AddBook from "./AddBook";
import CreateBooks from "./CreateBooks";
import {IAuthors, IBooks} from "../../types/LibraryTypes";
import Swal from "sweetalert2";

type BooksProps = {
    authors: IAuthors[]
}

const Books: React.FC<BooksProps> = (props) => {
    const bookList: IBooks[] = [{name: 'book 1', isbn: '11', author: 'z'},
        {
            name: 'book 2',
            isbn: '22',
            author: 'y'
        }, {name: 'book 3', isbn: '33', author: 'x'}];

    const [books, setBooks] = useState(bookList);
    const [formVisible, setFormVisibility] = useState<false | true>(false);
    const [bookToUpdate, setBookToUpdate] = useState<IBooks | null>(null);
    const [bookToUpdateIndex, setBookToUpdateIndex] = useState<number | null>(null);


    const handleOnFormOpen = () => {
        setBookToUpdateIndex(null);
        setBookToUpdate(null);
        if (!formVisible) {
            setFormVisibility(true);
        }
    }

    const handleOnFormClose = () => {
        setFormVisibility(false);
        setBookToUpdate(null);
        setBookToUpdateIndex(null);
    }

    const handleBookAdded = (name: string, isbn: string, author: string) => {
        const newBook: IBooks = {name, isbn, author};
        setBooks([...books, newBook]);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'New Book Added',
            toast: true,
            showConfirmButton: false,
            timer: 1500
        });
    }

    const deleteBook = (index: number | null) => {
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
                    }
                }
                if (bookToUpdateIndex === index) {
                    setBookToUpdateIndex(null);
                    setBookToUpdate(null);
                    setFormVisibility(false);
                }
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Book Deleted',
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });
            }
        })
    }

    const HandleOnUpdateRequest = (bookIndex: number) => {
        setBookToUpdate(books[bookIndex]);
        setBookToUpdateIndex(bookIndex);
    }

    useEffect(() => {
        if (!bookToUpdate) {
            return;
        }
        setFormVisibility(true);
    }, [bookToUpdate]);

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
            });
            setBookToUpdate(null);
            setBookToUpdateIndex(null);
            setFormVisibility(false);

    }
    return (
        <div>
            <BookTitle/>

            <BooksList bookList={books}
                       onBookDeleted={deleteBook}
                       onUpdateRequest={HandleOnUpdateRequest}

            />
            <AddBook handleOnFormOpen={handleOnFormOpen}/>
            {formVisible && <CreateBooks authors={props.authors}
                                         handleOnFormClose={handleOnFormClose}
                                         onBookAdded={handleBookAdded}
                                         bookToUpdate={bookToUpdate}
                                         onBookUpdated={handleUpdatedBook}
            />}

        </div>
    );
}

export default Books;