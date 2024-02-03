import React from 'react'
import InputContainer from '../InputContainer/InputContainer'
import classes from './input.module.css'
import PropTypes from 'prop-types'

const Input = React.forwardRef(
  (
    { label, type, defaultValue, onChange, onBlur, name, error },
    ref
  ) => {
    const getErrorMessage = () => {
      if (!error) return
      if (error.message) return error.message
      // defaults
      switch (error.type) {
        case 'required':
          return 'This Field Is Required'
        case 'minLength':
          return 'Field Is Too Short'
        default:
          return '*'
      }
    }

    return (
      <InputContainer label={label}>
        <input
          defaultValue={defaultValue}
          className={classes.input}
          type={type}
          placeholder={label}
          ref={ref}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
        />
        {error && <div className={classes.error}>{getErrorMessage()}</div>}
      </InputContainer>
    )
  }
)

// Add PropTypes validation outside of the forwardRef
Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string
  })
}

// Set the displayName property
Input.displayName = 'Input'

export default Input
