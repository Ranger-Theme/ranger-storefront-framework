import { COLORS } from './config'

const PREFIX = '--color'

/**
 * @ignore
 *
 * helper function for generating the proper function for returning
 * the correct property value for a color entry
 *
 * @param {string} property property variable name
 *
 * @returns {function} a function that generates the correct property value for a color entry
 */
export const getPropertyValueFunction = (property: string) => {
  return (opacityArgs: any) => {
    const { opacityVariable, opacityValue } = opacityArgs
    const value =
      opacityVariable != null
        ? `rgb(var(${property}) / var(${opacityVariable}, 1))`
        : `rgb(var(${property}))`
    return opacityValue != null ? `rgb(var(${property}) / ${opacityValue})` : value
  }
}

/**
 * create a custom property declaration for each color-weight
 * these declarations *write* values to custom properties
 *
 * @param {object} data color palette definition data
 * @param {string} prefix custom property (variable) prefix
 *
 * @returns {object} a generated list of color definitions based on the data
 */
export const declareColors = (data = COLORS, prefix = PREFIX) => {
  const declarations: any = {}

  for (const [color, definition] of Object.entries(data)) {
    if (typeof definition === 'string') {
      declarations[`${prefix}-${color}`] = definition
    } else {
      for (const [weight, value] of Object.entries(definition)) {
        declarations[`${prefix}-${color}-${weight}`] = value
      }
    }
  }

  return declarations
}

/**
 * create color-weight functions for export to `tailwind.preset.js`
 * these functions *read* values from custom properties
 *
 * @param {object} data color palette definition data
 * @param {string} prefix custom property (variable) prefix
 *
 * @returns {object} color configuration data for tailwind
 */
export const getColors = (data = COLORS, prefix = PREFIX) => {
  const colors: any = {}

  for (const [color, definition] of Object.entries(data)) {
    if (typeof definition === 'string') {
      const property = `${prefix}-${color}`
      colors[color] = getPropertyValueFunction(property)
    } else {
      const functions: any = {}

      for (const [weight] of Object.entries(definition)) {
        const property = `${prefix}-${color}-${weight}`
        functions[weight] = getPropertyValueFunction(property)
      }
      colors[color] = functions
    }
  }

  return colors
}

export const hexToRgb = (color: any) => {
  if (color.indexOf('#') !== 0) {
    return color
  }

  return color
    .match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
    .map((value: string) => {
      return parseInt(value, 16)
    })
    .filter((value: string) => {
      return !Number.isNaN(value)
    })
    .join(' ')
}
