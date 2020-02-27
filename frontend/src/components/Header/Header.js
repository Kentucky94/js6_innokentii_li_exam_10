import React from 'react';
import {Link} from "react-router-dom";

import './Header.css';


const Header = () => {
  return (
    <div className='Header'>
      <h3><Link to='/'>News App</Link></h3>
    </div>
  );
};

export default Header;