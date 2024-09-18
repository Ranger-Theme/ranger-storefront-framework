import NextLink from 'next/link'

export interface LinkProps {
  className?: string
  as?: string
  href?: any
  passHref?: boolean
  prefetch?: boolean
  replace?: boolean
  scroll?: boolean
  shallow?: boolean
  title?: string
  children?: any
  target?: string
}

const Link: React.FC<LinkProps> = ({
  as = '',
  href = '',
  passHref = false,
  prefetch = false,
  replace = false,
  scroll = true,
  shallow = false,
  title = '',
  target = '',
  children,
  ...props
}) => {
  if (typeof href === 'string' && href.startsWith('http')) {
    return (
      <a {...props} href={href} title={title} target={target} rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <NextLink
      as={as}
      href={href}
      passHref={passHref}
      prefetch={prefetch}
      replace={replace}
      shallow={shallow}
      scroll={scroll}
      title={title}
      target={target}
      {...props}
    >
      {children}
    </NextLink>
  )
}

export default Link
