import React from "react";
import {Plus} from "react-feather";

type addAuthorProps = {
    addClick: () => void
}

const AddAuthor: React.FC<addAuthorProps> = (props) => {
    return (
        <div className='add-author-book my-2' onClick={props.addClick}>
            <i> <Plus size='1.6em'/></i>
            <label className='mx-2'>Add Author</label>
        </div>
    )
}

export default AddAuthor;