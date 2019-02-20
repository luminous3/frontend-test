import React from 'react';
import classnames from 'classnames';
import style from './button.css';

const Button = ({
  label,
  filled,
  onClick,
  className
}) => (
  <button
    onClick={onClick}
    className={classnames(className, {
      [style.button]: true,
      [style.filled]: Boolean(filled)
    })}
  >
    {label}
  </button>
)

export default Button;
