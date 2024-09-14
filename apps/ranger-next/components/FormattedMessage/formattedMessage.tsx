import { FormattedMessage as IntlFormattedMessage } from 'react-intl'
import type { Props } from 'react-intl/src/components/message'

import { JsonKeys } from '@/types/i18n'

export interface FormattedMessageProps extends Props {
  id: JsonKeys
}

const FormattedMessage: React.FC<FormattedMessageProps> = ({ id, ...props }) => {
  return <IntlFormattedMessage id={id} {...props} />
}

export default FormattedMessage
