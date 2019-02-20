import React, { PureComponent } from 'react';
import Icon from 'components/Icon';
import style from './toggle.css';

class Toggle extends PureComponent {
  handleClick = ()=> {
    this.props.onClick(!this.props.value)
  }

  render() {
    const { label, value, onClick } = this.props;

    return (
      <div className={style.container} onClick={this.handleClick}>
        <Icon name={value ? 'filledRadio' : 'emptyRadio'} />
        <p>{label}</p>
      </div>
    )
  }
}

export default Toggle;
