import React, {Component} from 'react';
import {postNews} from "../../store/actions";
import {connect} from "react-redux";

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

  onSubmitHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      formData.append(key, this.state[key]);
    });

    this.props.postNews(formData);

    this.props.history.push('/');
  };

  render() {
    return (
      <>
        <h3>Add new post</h3>
        <form onSubmit={this.onSubmitHandler}>
          <input name="news_title" type="text" onChange={this.inputChangeHandler}/>
          <textarea name="news_content" onChange={this.inputChangeHandler}/>
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