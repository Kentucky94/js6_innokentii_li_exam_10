import {FETCH_NEWS_COMMENTS_SUCCESS, FETCH_NEWS_SUCCESS, FETCH_SINGLE_NEWS_SUCCESS} from "./actions";

const initialState = {
  news: [],
  currentNewsData: {},
  currentNewsComments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type){
    case FETCH_NEWS_SUCCESS:
      return {...state, news: action.news};
    case FETCH_SINGLE_NEWS_SUCCESS:
      return {...state, currentNewsData: action.newsData};
    case FETCH_NEWS_COMMENTS_SUCCESS:
      return {...state, currentNewsComments: action.newsComments};
    default:
      return state;
  }
};

export default reducer;