import Link from 'next/link'

const Header = () => {
  return (
    <header className="header">
      <Link href="/">
        <span>Header Nav</span>
      </Link>
      &nbsp;&nbsp;
      <Link href="/about-us">
        <span>About Us</span>
      </Link>
      &nbsp;&nbsp;
      <Link href="/block-collection/modal">
        <span>Modal</span>
      </Link>
    </header>
  )
}

export default Header
