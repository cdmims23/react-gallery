import React from 'react';

const Photo = (props) => {

  return(
 
  <li>
  <img src={`${props.photoUrl}`} alt={`${props.title}`}></img>
  </li>

  )
}

export default Photo;