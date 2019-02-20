import React, { PureComponent } from 'react';
import Icon from 'components/Icon';
import style from './option.css';

class Option extends PureComponent {
  state = {
    hover: false
  }

  toggleHover = () => {
    this.setState({ hover: !this.state.hover });
  }

  handleClick = () => {
    this.props.onChange(this.props.option);
  }

  render() {
    const { isSelected, option } = this.props;
    const { hover } = this.state;

    return (
      <div
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        className={style.container}
        onClick={this.handleClick}
      >
        <Icon fill={hover ? "#fff" : ""} name={ isSelected ? "checkedCircle" : "emptyCircle"} />
        <p>{option}</p>
      </div>
    )
  }
}

export default Option;
