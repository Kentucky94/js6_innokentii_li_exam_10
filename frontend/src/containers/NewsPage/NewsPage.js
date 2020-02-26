import React, {Component} from 'react';
import moment from 'moment';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import NewsBlock from "../../components/NewsBlock/NewsBlock";
import {fetchNews} from "../../store/actions";

import './NewsPage.css';

class NewsPage extends Component {
  componentDidMount() {
    this.props.fetchNews();

    setInterval(() => {
      this.props.fetchNews();
    }, 2000)
  }

  render() {
    const news = this.props.news.reverse().map(single => (
      <NewsBlock
        key={single.id}
        id={single.id}
        image={single.news_image}
        title={single.news_title}
        date={moment(single.news_date).format('MMMM Do YYYY, h:mm:ss a')}
      />
    ));

    return (
      <>
        <div className='NewsControls'>
          <h3>Posts</h3>
          <Link to='/news/add'>
            Add new post
          </Link>
        </div>
        <div>
          {news}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  news: state.news,
});

const mapDispatchToProps = dispatch => ({
  fetchNews: () => dispatch(fetchNews()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);