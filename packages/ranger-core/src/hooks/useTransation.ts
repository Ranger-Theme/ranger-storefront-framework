import type { MessageDescriptor, PrimitiveType } from 'react-intl'
import { useIntl } from 'react-intl'

export const useTransation = () => {
  const { formatMessage } = useIntl()

  const t = (
    descriptor: MessageDescriptor,
    values?: Record<string, PrimitiveType>,
    options?: any
  ) => {
    return formatMessage(descriptor, values, options)
  }

  return {
    t
  }
}
