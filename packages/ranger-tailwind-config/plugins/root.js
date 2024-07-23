const { declareColors } = require('./colors')

const addRulesets = ({ addBase, theme }) => {
  addBase({
    ':root': declareColors(theme('venia.plugins.root.colors'))
  })
}

const ID = 'root'

module.exports = [ID, addRulesets]
