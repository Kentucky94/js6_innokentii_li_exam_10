import React, {Component} from 'react';
import {connect} from "react-redux";

import './FullNewsPage.css';
import {fetchSingleNews} from "../../store/actions";

class FullNewsPage extends Component {
  async componentDidMount() {
    await this.props.fetchSingleNews(this.props.match.params.id);
  }

  render() {
    return (
      <>
        <div className='NewsInfo'>
          OK
          <h2>{this.props.currentNews.news_title}</h2>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  currentNews: state.currentNewsData
});

const mapDispatchToProps = dispatch => ({
  fetchSingleNews: id => dispatch(fetchSingleNews(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FullNewsPage);