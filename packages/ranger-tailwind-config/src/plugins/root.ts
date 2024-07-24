import { declareColors } from './colors'

export const addRulesets = ({ addBase, theme }: any) => {
  addBase({
    ':root': declareColors(theme('venia.plugins.root.colors'))
  })
}

export const ID = 'root'
