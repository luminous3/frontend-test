import React, { Component } from 'react';
import style from './dropDown.css';
import Icon from 'components/Icon';
import Option from './components/Option';

class DropDown extends Component {
  state= {
    open: false,
  }

  toggleOpen = () => { this.setState({ open: !this.state.open })}

  handleChange = (val) => {
    this.props.onChange(val)
    this.toggleOpen()
  }

  renderOptions = () => {
    const { options, value } = this.props;
    const { open } = this.state;

    if (!open) { return null }

    return (
      <div className={style.dropDownContainer}>
        {
          options.map(option => (
            <Option
              key={option}
              onChange={this.handleChange}
              option={option}
              isSelected={option === value}
            />
          ))
        }
      </div>
    )
  }

  render() {
    const { label } = this.props;
    const { open } = this.state;

    return (
      <div className={style.mainContainer}>
        <div
          className={style.mainField}
          onClick={this.toggleOpen}
        >
          {label}
          <Icon name={ open ? "upArrow" : "downArrow"} />
        </div>
        {this.renderOptions()}
      </div>
    )
  }
}

export default DropDown;
