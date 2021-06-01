import { format, parseISO } from 'date-fns';

export const telephoneNumberLink = (value: string) => {
  if (value == null) {
    return null
  }

  return `tel:+44${
    value
      .replace(/ /g, '')
      .slice(1)
  }`
}

export const emailAddressLink = (value: string) => {
  if (value == null) {
    return null
  }

  return `mailto:${value}`
}

export const fullName = (firstName: string, lastName: string) => {
  if (firstName == null && lastName == null) {
    return null
  }

  if (lastName != null) {
    return `${firstName} ${lastName}`
  }

  return firstName
}

export const formatDate = (value: string, stringFormat: string = 'dd/MM/yyyy') => {
  if (!value) return '';

  return format(parseISO(value.toString()), stringFormat);
}
