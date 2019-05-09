import { Action } from "../types/action";
import { ActionTypes } from "../actions/unsplash";
import { Image, Links, Urls, User } from "../types/API";
import { Sort } from "../Components/searchForm";

export interface UnsplashState {
  items: Array<Image>;
  item?: Image;
  total: number;
  totalPages: number;
  currentPage: number;
  searchInput?: string;
  filterInput?: string;
  sortingParam?: string;
}

const INITIAL_STATE = {
  items: [],
  total: 0,
  totalPages: 0,
  currentPage: 0,
  searchInput: "",
  filterInput: "",
  sortingParam: Sort.ASC
};

export const unsplash = (
  state: UnsplashState = INITIAL_STATE,
  action: Action<ActionTypes, any>
) => {
  switch (action.type) {
    case ActionTypes.SUBMIT:
      return { ...state, ...action.payload };

    case ActionTypes.FETCH:
      const items = [...state.items, ...action.payload.items];
      return { ...state, ...action.payload, items };

    case ActionTypes.FILTER:
      return { ...state, ...action.payload };

    case ActionTypes.IMAGE:
      return { ...state, item: action.payload };

    default:
      return state;
  }
};
