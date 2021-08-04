import {IBooks,IAuthors} from "../../types/LibraryTypes";
import {ActionTypes} from "../actionTypes";
import {Dispatch} from "redux";
import {BookAction,AuthorAction} from "../actions";

export const addBook = (book:IBooks) => {
  return (dispatch:Dispatch<BookAction>) => {
    dispatch({
      type: ActionTypes.ADD_NEW_BOOK,
      payload: book
    })
  }
}

export const deleteBook = (index:number) => {
  return (dispatch:Dispatch<BookAction>) => {
    dispatch({
      type: ActionTypes.DELETE_BOOK,
      payload: index
    })
  }
}

export const addAuthor = (author:IAuthors) => {
  return (dispatch:Dispatch<AuthorAction>) => {
    dispatch({
      type: ActionTypes.ADD_NEW_AUTHOR,
      payload: author
    })
  }
}

export const deleteAuthor = (index:number) => {
  return (dispatch:Dispatch<AuthorAction>) => {
    dispatch({
      type: ActionTypes.DELETE_AUTHOR,
      payload: index
    })
  }
}