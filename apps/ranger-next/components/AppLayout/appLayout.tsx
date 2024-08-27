import Header from '@/components/Header'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <div>
        <svg
          className="adm-date"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <use xlinkHref="#icon-date" />
        </svg>
        <svg
          className="adm-publish"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <use xlinkHref="#icon-publish" />
        </svg>
        <svg
          className="adm-place"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <use xlinkHref="#icon-place" />
        </svg>
      </div>
    </div>
  )
}

export default AppLayout
