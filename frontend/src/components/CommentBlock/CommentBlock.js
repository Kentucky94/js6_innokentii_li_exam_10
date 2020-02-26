import React from 'react';

import './CommentBlock.css';

const CommentBlock = props => {
  return (
    <div className='CommentBlock'>
      <h3>{props.author}</h3>
      <p>{props.text}</p>
    </div>
  );
};

export default CommentBlock;