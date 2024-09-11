import { useEffect } from 'react'

export interface NextPerformanceProps {
  showConsole?: boolean
  showJson?: boolean
}

const NextPerformance: React.FC<NextPerformanceProps> = ({
  showConsole = true,
  showJson = true,
  ...props
}) => {
  useEffect(() => {
    try {
      const nextElement: any = document.getElementById('__NEXT_DATA__')
      const textConent: string = nextElement.text
      const size: number = unescape(encodeURIComponent(textConent)).length
      const byte = (size / 1000).toFixed(1)

      if (showConsole) {
        if (parseFloat(byte) > 128) {
          console.info(
            '%cReduce the amount of data returned from getStaticProps, getServerSideProps, or getInitialProps to only the essential data to render the page. The default threshold of %c128kB can be configured in largePageDataBytes if absolutely necessary and the performance implications are understood.',
            'color: orange',
            'color: orange;font-weight:bold'
          )
        } else {
          console.info(
            `%cThe ssr props size: %c${byte}kB`,
            'color: green',
            'color: green;font-weight:bold'
          )
        }
      }

      if (showJson) console.info(JSON.parse(textConent))
    } catch (error) {
      console.info(error)
    }
  }, [])

  return <div className="performace" {...props} />
}

export default NextPerformance
