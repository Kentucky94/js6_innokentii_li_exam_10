import React from 'react';
import {connect} from "react-redux";

import './NewsBlock.css';
import {deleteNews} from "../../store/actions";


const NewsBlock = props => {
  return (
    <div className='NewsBlock'>
      <img src={`http://localhost:8000/uploads/${props.image}`} alt="news"/>
      <h3>{props.title}</h3>
      <p>{props.date}</p>
      <button onClick={() => props.deleteNews(props.id)}>Delete</button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteNews: id => dispatch(deleteNews(id))
});

export default connect(null, mapDispatchToProps)(NewsBlock);