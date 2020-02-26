import axiosOrders from "../axiosOrders";

export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_SINGLE_NEWS_SUCCESS = 'FETCH_SINGLE_NEWS_SUCCESS';
export const FETCH_NEWS_COMMENTS_SUCCESS = 'FETCH_NEWS_COMMENTS_SUCCESS';

export const fetchNewsSuccess = news => ({type: FETCH_NEWS_SUCCESS, news});
export const fetchSingleNewsSuccess = newsData => ({type: FETCH_SINGLE_NEWS_SUCCESS, newsData});
export const fetchNewsCommentsSuccess = newsComments => ({type: FETCH_NEWS_COMMENTS_SUCCESS, newsComments});

export const fetchNews = () => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get('/news');

      dispatch(fetchNewsSuccess(response.data));
    }catch(e){
      console.log(e);
    }
  }
};

export const fetchSingleNews = id => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get(`/news/${id}`);

      dispatch(fetchSingleNewsSuccess(response.data))
    }catch(e){
      console.log(e);
    }
  }
};

export const fetchNewsComments = id => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get(`/comments/${id}`);

      dispatch(fetchNewsCommentsSuccess(response.data))
    }catch(e){
      console.log(e);
    }
  }
};

export const postNews = newsData => {
  return async dispatch => {
    try{
      await axiosOrders.post('/news', newsData);
    }catch(e){
      console.log(e);
    }
  }
};

export const deleteNews = id => {
  return async dispatch => {
    try{
      await axiosOrders.delete(`/news/${id}`)
    }catch(e){
      console.log(e);
    }
  }
};