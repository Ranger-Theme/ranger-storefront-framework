import type { FC } from 'react'
import ReactCookieConsent from 'react-cookie-consent'
import type { CookieConsentProps as ReactCookieConsentProps } from 'react-cookie-consent/dist/CookieConsent.props'

export interface CookieConsentProps extends Partial<ReactCookieConsentProps> {}

const CookieConsent: FC<CookieConsentProps> = ({
  children,
  buttonText = 'Allow all cookies',
  cookieName = 'cookie_consent',
  location = 'bottom',
  expires = 7,
  ...props
}) => {
  return (
    <ReactCookieConsent
      location={location}
      buttonText={buttonText}
      cookieName={cookieName}
      expires={expires}
      sameSite="lax"
      cookieSecurity
      {...props}
    >
      {children}
    </ReactCookieConsent>
  )
}

export default CookieConsent
