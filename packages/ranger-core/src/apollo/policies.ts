type MergePolicies = {
  mergeObjects: any
}

export const typePolicies = {
  Query: {
    fields: {
      cart: {
        keyArgs: () => 'Cart'
      },
      customerCart: {
        keyArgs: () => 'Cart'
      },
      products: {
        merge(existing: any, incoming: any, { mergeObjects }: MergePolicies) {
          return mergeObjects(existing, incoming)
        }
      },
      customer: {
        merge(existing: any, incoming: any, { mergeObjects }: MergePolicies) {
          return mergeObjects(existing, incoming)
        }
      }
    }
  }
}
