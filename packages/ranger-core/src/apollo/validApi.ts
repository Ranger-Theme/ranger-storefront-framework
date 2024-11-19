import { isEmpty } from 'lodash-es'

export const validApiMessage = (message: string) => {
  const errorMessage: string[] = [
    'Could not find a cart',
    'The request is allowed for logged in customer',
    'The current user cannot perform operations on cart',
    // eslint-disable-next-line quotes
    "The cart isn't active",
    // eslint-disable-next-line quotes
    "The current customer isn't authorized."
  ]

  const match: any = errorMessage.find((item: string) => item.indexOf(message) > -1)
  return !isEmpty(match)
}
