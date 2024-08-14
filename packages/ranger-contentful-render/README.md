# @ranger-theme/contentful-render

## 🎉 Introduce

> core核心架构

## 📚 Documentation

- [Npm](https://www.npmjs.com/package/@ranger-theme/contentful-render)
- [CHANGELOG](CHANGELOG.md)

## 📦 Install

```bash
$ npm install --save-dev @ranger-theme/contentful-render
# or
$ yarn add --save-dev @ranger-theme/contentful-render
# or
$ pnpm add --save-dev @ranger-theme/contentful-render
```

## 🔨 Usage
```js
const createApolloClient = ({ cookies, reduxState }) => {
  const magentoLink = createMagentoLink({ cookies, reduxState })
  const contentfulLink = createContentfulLink()

  return new ApolloClient({
    // Routes the query to the proper client
    link: ApolloLink.split(
      (operation) => operation.getContext().clientName === 'contentful',
      contentfulLink,
      magentoLink
    ),
    cache: new InMemoryCache({
      addTypename: false,
      typePolicies
    }).restore({}),
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    defaultOptions: {
      query: {
        fetchPolicy: 'cache-first'
      }
    }
  })
}
```

Send api to query data
```js
import { useAwaitQuery } from '@ranger-theme/hooks'

export const useContentfulPage = (url) => {
  const getLandingPage = useAwaitQuery(GET_LANDING_PAGE)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(null)

  useEffect(() => {
    const fetchLandingPage = async () => {
      try {
        setIsLoading(true)

        const { data } = await getLandingPage({
          context: {
            clientName: 'contentful'
          },
          variables: {
            where: {
              url
            }
          }
        })
        const result = data?.pageCollection?.items?.[0] ?? null
        setPage(result)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }

    fetchLandingPage()
  }, [getLandingPage, url])

  return {
    isLoading,
    page
  }
}
```
