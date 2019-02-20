import React from 'react';
import style from './header.css';

const Header = ({ title, children }) => (
  <div className={style.container}>
    <h1>{title}</h1>
    {children}
  </div>
)


export default Header;
