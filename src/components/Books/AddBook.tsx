import React from "react";
import {Plus} from "react-feather";

type AddBookProps = {
    handleOnFormOpen: () => void
}

const AddBook: React.FC<AddBookProps> = (props) => {
    return (
        <div className='add-author-book my-2' onClick={props.handleOnFormOpen}>
            <i> <Plus size='1.6em'/></i>
            <label className='mx-2'>Add Book</label>
        </div>
    )
}

export default AddBook;