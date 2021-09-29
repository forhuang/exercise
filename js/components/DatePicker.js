import { memo, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'

const DatePicker = memo(({ id, value, onChange }) => {
  const container = useRef()

  useEffect(() => {
    flatpickr(container.current, {
      onChange,
      dateFormat: 'Y-m-d',
    })
  }, [])

  return (
    <input
      id={id}
      className="form-control"
      ref={container}
      value={value}
    />
  )
}, (prevState, nextState) => (
  prevState.value === nextState.value
))

DatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default DatePicker
