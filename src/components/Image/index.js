import React from 'react';
import classnames from 'classnames'
import style from './image.css';

const Image = ({ src, className }) => (
  <div
    style={{backgroundImage: `url(${src})`}}
    className={classnames(style.image, className)}
  />
)

export default Image;
