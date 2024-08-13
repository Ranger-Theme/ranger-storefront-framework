/*
 * Fragment Block
 * Include content on a page as a fragment.
 * https://www.aem.live/developer/block-collection/fragment
 */
import { loadBlocks } from '../../scripts/aem.js'
import { decorateMain } from '../../scripts/scripts.js'

/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @returns {HTMLElement} The root element of the fragment
 */
export async function loadFragment(path) {
  if (path && path.startsWith('/')) {
    const api =
      window?.edegePlatform === 'SSR' ? `${window.location.origin}/api/edege` : window.edegeURL
    const resp = await fetch(`${api}${path}.plain.html`)
    if (resp.ok) {
      const result = await resp.text()
      const main = document.createElement('main')
      main.innerHTML = result

      // reset base path for media to fragment base
      const resetAttributeBase = (tag, attr) => {
        main.querySelectorAll(`${tag}[${attr}^="./media_"]`).forEach((elem) => {
          elem[attr] = new URL(
            elem.getAttribute(attr),
            new URL(path, window.edegeURL || window.location)
          ).href
        })
      }
      resetAttributeBase('img', 'src')
      resetAttributeBase('source', 'srcset')

      decorateMain(main)
      await loadBlocks(main)
      return main
    }
  }
  return null
}

export default async function decorate(block) {
  const link = block.querySelector('a')
  const path = link ? link.getAttribute('href') : block.textContent.trim()
  const fragment = await loadFragment(path)
  if (fragment) {
    const fragmentSection = fragment.querySelector(':scope .section')
    if (fragmentSection) {
      block.closest('.section').classList.add(...fragmentSection.classList)
      block.closest('.fragment').replaceWith(...fragment.childNodes)
    }
  }
}
