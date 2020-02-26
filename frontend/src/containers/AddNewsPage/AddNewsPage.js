import React, {Component} from 'react';
import {postNews} from "../../store/actions";
import {connect} from "react-redux";

import './AddNewsPage.css';

class AddNewsPage extends Component {
  state = {
    news_title: '',
    news_content: '',
    news_image: '',
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  fileChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.files[0]
    })
  };

  onSubmitHandler = async event => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      formData.append(key, this.state[key]);
    });

    await this.props.postNews(formData);

    this.props.history.push('/');
  };

  render() {
    return (
      <>
        <h3>Add new post</h3>
        <form onSubmit={this.onSubmitHandler} className='newsForm'>
          <h4>Title</h4>
          <input name="news_title" type="text" onChange={this.inputChangeHandler}/>
          <h4>Type here</h4>
          <textarea name="news_content" onChange={this.inputChangeHandler}/>
          <h4>Image</h4>
          <input name="news_image" type="file" onChange={this.fileChangeHandler}/>
          <button>Post news</button>
        </form>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  postNews: newsData => dispatch(postNews(newsData))
});

export default connect(null, mapDispatchToProps)(AddNewsPage);