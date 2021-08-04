import {IBooks,IAuthors} from "../../types/LibraryTypes";
import {ActionTypes} from '../actionTypes';

interface addBook {
  type: ActionTypes.ADD_NEW_BOOK,
  payload: IBooks
}

interface deleteBook {
  type: ActionTypes.DELETE_BOOK,
  payload: number
}

export type BookAction = addBook | deleteBook;

interface addAuthor {
  type: ActionTypes.ADD_NEW_AUTHOR,
  payload: IAuthors
}

interface deleteAuthor {
  type: ActionTypes.DELETE_AUTHOR,
  payload: number
}

export type AuthorAction = addAuthor | deleteAuthor;
