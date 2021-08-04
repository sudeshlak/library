import {IBooks} from "../../types/LibraryTypes";
import {BookAction} from "../actions";
import {ActionTypes} from "../actionTypes";

const reducer = (state = [], action: BookAction) => {
  switch (action.type) {
    case ActionTypes.DELETE_BOOK :{
      const allBooks: IBooks[] = state.slice();
      allBooks.splice(action.payload, 1);
      return allBooks
    }
    case ActionTypes.ADD_NEW_BOOK:{
      if(state){
        return [...state,action.payload]
        }
      else{
        return [action.payload]
      }
    }
    default :
      return state;
  }
}

export default reducer;