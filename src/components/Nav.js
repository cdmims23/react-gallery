import React from 'react';
import {Link} from 'react-router-dom';

const Nav = () => {
    return  (
        <nav className="main-nav">
        <ul>
          <li><Link to="/cat">Cats</Link></li>
          <li><Link to="/dog">Dogs</Link></li>
          <li><Link to="/computer">Computers</Link></li>
        </ul>
      </nav>
    )
}

export default Nav;