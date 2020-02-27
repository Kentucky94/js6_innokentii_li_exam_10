import React, {Component} from 'react';
import {connect} from "react-redux";
import moment from "moment";

import './FullNewsPage.css';
import {deleteNewsComment, fetchNewsComments, fetchSingleNews, postNewsComment} from "../../store/actions";
import CommentBlock from "../../components/CommentBlock/CommentBlock";

let myInterval = null;

class FullNewsPage extends Component {
  state = {
    comment_author: '',
    comment_text: '',
  };

  async componentDidMount() {
    await this.props.fetchSingleNews(this.props.match.params.id);
    await this.props.fetchNewsComments(this.props.match.params.id);

    myInterval = setInterval(() => {
      this.props.fetchNewsComments(this.props.match.params.id);
    }, 2000)
  }

  componentWillUnmount() {
    clearInterval(myInterval)
  }

  commentInputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  };

  commentSubmitHandler = async event => {
    event.preventDefault();

    const commentData = {...this.state};

    commentData.news_id = this.props.match.params.id;

    if(!commentData.comment_author){
      commentData.comment_author = 'Anonymous';
    }

    await this.props.postNewsComment(commentData);
  };

  render() {
    const comments = this.props.currentComments.map(comment =>
      <CommentBlock
        key={comment.id}
        id={comment.id}
        author={comment.comment_author}
        text={comment.comment_text}
        onDelete={this.props.deleteNewsComment}
      />
    );

    return (
      <>
        <div className='NewsInfo'>
          <h1>{this.props.currentNews.news_title}</h1>
          <p><b>Posted on:</b> {moment(this.props.currentNews.news_date).format('MMMM Do YYYY, h:mm:ss a')}</p>
          <p>{this.props.currentNews.news_content}</p>
        </div>

        <div className='CommentsBlock'>
          <h2>Comments</h2>
          <div>
            {comments}
          </div>
        </div>

        <h2>Add new comment</h2>
        <form onSubmit={this.commentSubmitHandler} className='commentForm'>
          <h4>Author</h4>
          <input name="comment_author" type="text" onChange={this.commentInputChangeHandler}/>
          <h4>Type comment here</h4>
          <textarea name="comment_text" onChange={this.commentInputChangeHandler}/>
          <button>Post comment</button>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  currentNews: state.currentNewsData,
  currentComments: state.currentNewsComments
});

const mapDispatchToProps = dispatch => ({
  fetchSingleNews: id => dispatch(fetchSingleNews(id)),
  fetchNewsComments: id => dispatch(fetchNewsComments(id)),
  postNewsComment: commentData => dispatch(postNewsComment(commentData)),
  deleteNewsComment: comment_id => dispatch(deleteNewsComment(comment_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(FullNewsPage);