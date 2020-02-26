import React, {Component} from 'react';
import {fetchNews} from "../../store/actions";
import {connect} from "react-redux";
import NewsBlock from "../../components/NewsBlock/NewsBlock";
import {Link} from "react-router-dom";

class NewsPage extends Component {
  componentDidMount() {
    this.props.fetchNews();
  }

  render() {
    const news = this.props.news.reverse().map(single => (
      <NewsBlock
        key={single.id}
        id={single.id}
        image={single.news_image}
        title={single.news_title}
        date={single.news_date}
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