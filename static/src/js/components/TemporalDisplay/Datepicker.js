import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import Datetime from 'react-datetime'

import './Datepicker.scss'

class Datepicker extends PureComponent {
  constructor(props) {
    super(props)
    this.format = 'YYYY-MM-DD HH:mm:ss'
    this.isValidDate = this.isValidDate.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onClearClick = this.onClearClick.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onTodayClick = this.onTodayClick.bind(this)
    this.today = moment()

    this.setRef = (element) => {
      this.picker = element
    }

    this.state = {
      value: ''
    }

    // console.warn('this.state', this.state)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Clear out the value in the input if the component is updated with empty value. This occurs
    // when the props are updated outside of the component (i.e. when the "clear" button) is clicked

    if (nextProps.value !== prevState.value) {
      // console.warn('getDerivedStateFromProps', nextProps.value)
      return { value: nextProps.value }
    }
    return null
  }

  componentDidMount() {
    // Add a custom set of "Today" and "Clear" buttons and insert them into the picker
    const container = ReactDOM.findDOMNode(this).querySelector('.rdtPicker') // eslint-disable-line
    const buttonToday = document.createElement('button')
    const buttonClear = document.createElement('button')
    const buttonContainer = document.createElement('div')

    buttonToday.innerHTML = 'Today'
    buttonClear.innerHTML = 'Clear'
    buttonToday.classList.add('datetime__button', 'datetime__button--today')
    buttonClear.classList.add('datetime__button', 'datetime__button--clear')
    buttonContainer.classList.add('datetime__buttons')
    buttonToday.addEventListener('click', this.onTodayClick)
    buttonClear.addEventListener('click', this.onClearClick)
    buttonContainer.appendChild(buttonToday)
    buttonContainer.appendChild(buttonClear)
    container.appendChild(buttonContainer)
  }

  onBlur() {
    this.picker.setState({
      currentView: 'years'
    })
  }

  /**
  * Set the date to today using the beginning of the day for "Start" and the end of the day for "End"
  */
  onTodayClick() {
    const {
      onSubmit,
      type
    } = this.props

    const today = moment().utc()
    let valueToSet = null

    if (type === 'start') {
      valueToSet = today.startOf('day')
    } else if (type === 'end') {
      valueToSet = today.endOf('day')
    }

    onSubmit(valueToSet)
  }

  /**
  * Clear out the currently selected date
  */
  onClearClick() {
    const { onSubmit } = this.props
    onSubmit('')
  }

  /**
  * Set up the onChange event for the datepicker
  */
  onChange(value) {
    // console.warn('onChange')
    // console.warn('onChange.caller', arguments.callee.caller.toString())

    const {
      onSubmit,
      type
    } = this.props

    let valueToSet = null
    // const valueCopy = Object.assign({}, value)

    // console.warn('onChange value', value)
    // console.warn('onChange e', e)
    console.warn('I think the problem is happening in the if statement below')

    // Check to see if this is a moment object, which it will be when a valid date is entered
    // Otherwise create a moment object with the value to send. Do this so we can call the isValid
    // method in the callback function passed into the props from the TemporalSelectionDropdown component
    if (typeof value !== 'string' && value instanceof moment) {
      value.utc()

      // These startOf and endOf functions seem to not be respecting the utc as I understand it.
      // For my timezone, the endOf returns the day after the day I have selected in the picker.
      // This happens both with these helpers, as well as manually calling .set() on the moment objects :(
      if (type === 'start') {
        valueToSet = value.startOf('day')
      } else if (type === 'end') {
        valueToSet = value.endOf('day')
      }
      // console.log('moment().utcOffset()', moment().utcOffset())
      // console.log('valueToSet', valueToSet)
    } else {
      valueToSet = moment.utc(value, this.format, true)
    }

    onSubmit(valueToSet)
  }

  /**
  * Check to see if a date should be clickable in the picker
  */
  isValidDate(date) {
    // Is the date before 1960?
    if (date.isBefore('1960-01-01', 'year')) return false

    // Is the date after today?
    if (date.isAfter(this.today, 'day')) return false

    // Show the date
    return true
  }

  render() {
    const {
      format,
      isValidDate,
      onBlur,
      onChange,
      onNavigateBack,
      setRef,
      state
      // props
    } = this
    let { value } = state

    const isValidISO = moment.utc(value, 'YYYY-MM-DDTHH:m:s.SSSZ', true).isValid()

    if (isValidISO) {
      value = moment.utc(value).format(format)
    }

    // console.warn(`state in component at render ${props.type}`, value)

    return (
      <Datetime
        className="datetime"
        closeOnSelect
        dateFormat="YYYY-MM-DD HH:mm:ss"
        inputProps={{
          placeholder: 'YYYY-MM-DD HH:mm:ss'
        }}
        isValidDate={isValidDate}
        onBlur={onBlur}
        onChange={onChange}
        onNavigateBack={onNavigateBack}
        ref={setRef}
        timeFormat={false}
        value={value}
        viewMode="years"
      />
    )
  }
}

Datepicker.defaultProps = {
  type: '',
  value: ''
}

Datepicker.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.string
}

export default Datepicker
