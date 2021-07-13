import { format, parseISO } from 'date-fns';

export const telephoneNumberLink = (value: string): string | null => {
  if (value == null) {
    return null
  }

  return `tel:+44${
    value
      .replace(/ /g, '')
      .slice(1)
  }`
}

export const emailAddressLink = (value: string): string | null => {
  if (value == null) {
    return null
  }

  return `mailto:${value}`
}

export const fullName = (firstName: string, lastName: string): string | null => {
  if (firstName == null && lastName == null) {
    return null
  }

  if (lastName != null) {
    return `${firstName} ${lastName}`
  }

  return firstName
}

export const formatDate = (value: string, stringFormat: string = 'dd/MM/yyyy'): string => {
  if (!value) return '';

  return format(parseISO(value.toString()), stringFormat);
}

export const uppercaseFirst = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1)

export const gbp = (value: number): string => `£${(value / 100).toFixed(2)}`
