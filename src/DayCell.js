import React, { Component, PropTypes } from 'react';

class DayCell extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      hover     : false,
      active    : false
    }

    this.styles = this.props.theme;
  }

  handleMouseEvent(event) {
    event.preventDefault();

    if (this.props.isPassive) return null;

    const newState = {};

    switch (event.type) {
      case 'mouseenter':
        newState['hover'] = true;
        break;

      case 'mouseup':
      case 'mouseleave':
        newState['hover'] = false;
        newState['active'] = false;
        break;

      case 'mousedown':
        newState['active'] = true;
        break;
    }

    this.setState(newState);
  }

  handleSelect(event) {
    event.preventDefault();

    if (this.props.isPassive) return null;

    this.props.onSelect(this.props.dayMoment);
  }

  getStateStyles() {
    const { hover, active } = this.state;
    const { isSelected, isInRange, isPassive, isStartEdge, isEndEdge, isToday, isStartOfWeek, isEndOfWeek } = this.props;
    const { styles } = this;

    const hoverStyle        = hover ? styles['DayHover'] : {};
    const activeStyle       = active ? styles['DayActive'] : {};
    const passiveStyle      = isPassive ? styles['DayPassive'] : {};
    const startEdgeStyle    = isStartEdge ? styles['DayStartEdge'] : {};
    const endEdgeStyle      = isEndEdge ? styles['DayEndEdge'] : {};
    const selectedStyle     = isSelected ? styles['DaySelected'] : {};
    const inRangeStyle      = isInRange ? styles['DayInRange'] : {};
    const todayStyle        = isToday && !(isInRange || isSelected) ? styles['DayToday'] : {};
    const startOfWeekStyle  = isStartOfWeek ? styles['DayStartOfWeek'] : {};
    const endOfWeekStyle    = isEndOfWeek ? styles['DayEndOfWeek'] : {};
    const inRangeStartOfWeekStyle  = isInRange && isStartOfWeek  ? styles['DayInRangeStartOfWeek'] : {};
    const inRangeEndOfWeekStyle  = isInRange && isEndOfWeek ? styles['DayInRangeEndOfWeek'] : {};
    const isSelectedStartOfWeekStyle  = isSelected && isStartOfWeek  ? styles['DaySelectedStartOfWeek'] : {};
    const isSelectedEndOfWeekStyle  = isSelected && isEndOfWeek ? styles['DaySelectedEndOfWeek'] : {};


    return {
      ...todayStyle,
      ...inRangeStyle,
      ...hoverStyle,
      ...passiveStyle,
      ...activeStyle,
      ...selectedStyle,
      ...startEdgeStyle,
      ...endEdgeStyle,
      ...startOfWeekStyle,
      ...endOfWeekStyle,
      ...inRangeStartOfWeekStyle,
      ...inRangeEndOfWeekStyle,
      ...isSelectedStartOfWeekStyle,
      ...isSelectedEndOfWeekStyle
    };
  }

  getClassNames() {
    const { isSelected, isInRange, isPassive, isStartEdge, isEndEdge, isToday, isStartOfWeek, isEndOfWeek } = this.props;

    let classNames = 'rdr-Day ';
    classNames = (isStartEdge) ? classNames + 'is-startEdge ' : classNames;
    classNames = (isEndEdge) ? classNames + 'is-endEdge ' : classNames;
    classNames = (isToday) ? classNames + 'is-today ' : classNames;
    classNames = (isSelected) ? classNames + 'is-selected ' : classNames;
    classNames = (isInRange) ? classNames + 'is-inRange ' : classNames;
    classNames = (isPassive) ? classNames + 'is-passive ' : classNames;
    classNames = (isStartOfWeek) ? classNames + 'is-startOfWeek ' : classNames;
    classNames = (isEndOfWeek) ? classNames + 'is-endOfWeek ' : classNames;

    return classNames;
  }

  render() {
    const { styles }    = this;
    const { dayMoment } = this.props;
    const stateStyle    = this.getStateStyles();
    const classNames    = this.getClassNames();

    return (
      <span
        onMouseEnter={ this.handleMouseEvent.bind(this) }
        onMouseLeave={ this.handleMouseEvent.bind(this) }
        onMouseDown={ this.handleMouseEvent.bind(this) }
        onMouseUp={ this.handleMouseEvent.bind(this) }
        onClick={ this.handleSelect.bind(this) }
        className={ classNames }
        style={{...styles['Day'], ...stateStyle}}>
        { dayMoment.date() }
      </span>
    );
  }
}

DayCell.defaultProps = {
  theme      : { 'Day' : {} }
}

DayCell.propTypes = {
  dayMoment  : PropTypes.object.isRequired,
  onSelect   : PropTypes.func,
  isSelected : PropTypes.bool,
  isInRange  : PropTypes.bool,
  isPassive  : PropTypes.bool,
  theme      : PropTypes.shape({
    Day      : PropTypes.object.isRequired
  }).isRequired,
}

export default DayCell;
