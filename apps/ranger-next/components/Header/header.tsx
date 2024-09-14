import Link from 'next/link'

import FormattedMessage from '@/components/FormattedMessage'

const Header = () => {
  return (
    <header>
      <Link href="/">
        <span>Home</span>
      </Link>
      &nbsp;&nbsp;
      <Link href="/about-us">
        <span>About Us</span>
      </Link>
      &nbsp;&nbsp;
      <Link href="/block-collection/modal">
        <span>Modal</span>
      </Link>
      &nbsp;&nbsp;
      <Link href="/block-collection/table">
        <span>Table</span>
      </Link>
      &nbsp;&nbsp;
      <Link href="/block-collection/video">
        <span>Video</span>
      </Link>
      &nbsp;&nbsp;
      <Link href="/cart">
        <span>
          <FormattedMessage id="global.cart" />
        </span>
      </Link>
      &nbsp;&nbsp;
      <Link href="/checkout">
        <span>Checkout</span>
      </Link>
    </header>
  )
}

export default Header
