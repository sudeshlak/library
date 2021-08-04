import {IAuthors} from "../../types/LibraryTypes";
import {AuthorAction} from "../actions"
import {ActionTypes} from "../actionTypes";

const reducer = (state = [], action: AuthorAction) => {
  switch (action.type) {
    case ActionTypes.DELETE_AUTHOR : {
      const allAuthors: IAuthors[] = state.slice();
      allAuthors.splice(action.payload, 1);
      return allAuthors
    }
    case ActionTypes.ADD_NEW_AUTHOR: {
      if(state){
        return[...state,action.payload]
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