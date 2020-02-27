import React from 'react';

import './CommentBlock.css';

const CommentBlock = props => {
  return (
    <div className='CommentBlock'>
      <h3>{props.author}</h3>
      <p>{props.text}</p>
      <button onClick={() => props.onDelete(props.id)}>Delete comment</button>
    </div>
  );
};

export default CommentBlock;