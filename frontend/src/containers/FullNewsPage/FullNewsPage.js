import React, {Component} from 'react';
import {connect} from "react-redux";
import moment from "moment";

import './FullNewsPage.css';
import {fetchNewsComments, fetchSingleNews} from "../../store/actions";
import CommentBlock from "../../components/CommentBlock/CommentBlock";

class FullNewsPage extends Component {
  async componentDidMount() {
    await this.props.fetchSingleNews(this.props.match.params.id);
    await this.props.fetchNewsComments(this.props.match.params.id);
  }

  render() {
    const comments = this.props.currentComments.map(comment =>
      <CommentBlock
        key={comment.id}
        author={comment.comment_author}
        text={comment.comment_text}
      />
    );

    return (
      <>
        <div className='NewsInfo'>
          <h2>{this.props.currentNews.news_title}</h2>
          <p>{moment(this.props.currentNews.news_date).format('MMMM Do YYYY, h:mm:ss a')}</p>
          <p>{this.props.currentNews.news_content}</p>
        </div>
        <div>
          {comments}
        </div>
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
  fetchNewsComments: id => dispatch(fetchNewsComments(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(FullNewsPage);