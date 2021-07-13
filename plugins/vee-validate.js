import { extend } from 'vee-validate'
import {
  confirmed,
  email,
  min,
  required,
  required_if,
} from 'vee-validate/dist/rules'

const isEmpty = value => ['', null, undefined, false].includes(value)

extend('confirmed', {
  ...confirmed,
  message: 'This field must match the previous field',
})

extend('email', {
  ...email,
  message: 'This field must be a valid email address',
})

extend('min', {
  ...min,
  validate: (value, { minChars }) => ({
    valid: value.length >= minChars,
  }),
  params: ['minChars'],
  message: 'This field must be at least {minChars} characters',
})

extend('required', {
  ...required,
  message: 'This field is required',
  validate: value => ({
    required: true,
    valid: !isEmpty(value),
  }),
  computesRequired: true,
})

extend('required_if', {
  ...required_if,
  validate: (fieldValue, { target, value }) => {
    let required

    if (fieldValue && fieldValue.length) {
      required = value == String(target).trim()
    } else {
      required = !isEmpty(target)
    }

    return {
      valid: required ? !isEmpty(fieldValue) : true,
      required,
    }
  },
  params: ['target', 'value'],
  message: `This field is required`,
  computesRequired: true,
})

extend('is_true', {
  validate: fieldValue => fieldValue === true,
  message: 'This box must be ticked',
})

extend('is_date', {
  validate: fieldValue => /\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/.test(fieldValue),
  message: 'This field must be a valid date in the format YYYY-MM-DD',
})
